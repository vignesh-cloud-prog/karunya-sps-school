import { db, storage } from '@/firebase/clientApp';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { TeamMember, TeamFormData } from '@/types/team';

const TEAM_COLLECTION = 'team';

export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const teamRef = collection(db, TEAM_COLLECTION);
    const q = query(teamRef, orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as TeamMember[];
  } catch (error) {
    console.error('Error getting team members:', error);
    // Return empty array instead of throwing to prevent UI errors
    return [];
  }
}

export async function addTeamMember(member: TeamFormData): Promise<void> {
  try {
    const teamRef = collection(db, TEAM_COLLECTION);
    await addDoc(teamRef, member);
  } catch (error) {
    console.error('Error adding team member:', error);
    throw new Error('Failed to add team member');
  }
}

export async function updateTeamMember(id: string, member: TeamFormData): Promise<void> {
  try {
    const memberRef = doc(db, TEAM_COLLECTION, id);
    // Convert TeamFormData to a plain object for Firestore update
    const updateData = {
      name: member.name,
      position: member.position,
      description: member.description,
      image: member.image,
      imageRef: member.imageRef,
      order: member.order,
    };
    await updateDoc(memberRef, updateData);
  } catch (error) {
    console.error('Error updating team member:', error);
    throw new Error('Failed to update team member');
  }
}

export async function deleteTeamMember(id: string): Promise<void> {
  try {
    const memberRef = doc(db, TEAM_COLLECTION, id);
    await deleteDoc(memberRef);
  } catch (error) {
    console.error('Error deleting team member:', error);
    throw new Error('Failed to delete team member');
  }
}

export async function uploadTeamImage(file: File): Promise<{ url: string; ref: string }> {
  if (!file) {
    throw new Error('No file provided');
  }
  
  try {
    const fileRef = ref(storage, `team/${uuidv4()}_${file.name}`);
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);
    return { url, ref: fileRef.fullPath };
  } catch (error) {
    console.error('Error uploading team image:', error);
    throw new Error('Failed to upload image');
  }
}

export async function deleteTeamImage(imageRef: string): Promise<void> {
  if (!imageRef) {
    console.warn('No image reference provided for deletion');
    return;
  }
  
  try {
    const imageRefObj = ref(storage, imageRef);
    await deleteObject(imageRefObj);
  } catch (error) {
    console.error('Error deleting team image:', error);
    // Don't throw here to prevent blocking team member deletion due to image issues
  }
} 