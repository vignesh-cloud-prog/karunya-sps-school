import { db, storage } from '@/firebase/clientApp';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

export interface Activity {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
  imageRef: string;
}

export interface ActivityFormData {
  title: string;
  description: string;
  date: string;
  image: string;
  imageRef: string;
}

export async function getActivities(): Promise<Activity[]> {
  try {
    const activitiesRef = collection(db, 'activities');
    const q = query(activitiesRef, orderBy('date', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Activity[];
  } catch (error) {
    console.error('Error getting activities:', error);
    // Return empty array instead of throwing to prevent UI errors
    return [];
  }
}

export async function addActivity(activity: ActivityFormData): Promise<void> {
  try {
    const activitiesRef = collection(db, 'activities');
    await addDoc(activitiesRef, activity);
  } catch (error) {
    console.error('Error adding activity:', error);
    throw new Error('Failed to add activity');
  }
}

export async function updateActivity(id: string, activity: ActivityFormData): Promise<void> {
  try {
    const activityRef = doc(db, 'activities', id);
    await updateDoc(activityRef, activity);
  } catch (error) {
    console.error('Error updating activity:', error);
    throw new Error('Failed to update activity');
  }
}

export async function deleteActivity(id: string): Promise<void> {
  try {
    const activityRef = doc(db, 'activities', id);
    await deleteDoc(activityRef);
  } catch (error) {
    console.error('Error deleting activity:', error);
    throw new Error('Failed to delete activity');
  }
}

export async function uploadImage(file: File): Promise<{ url: string; ref: string }> {
  if (!file) {
    throw new Error('No file provided');
  }
  
  try {
    const fileRef = ref(storage, `activities/${uuidv4()}_${file.name}`);
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);
    return { url, ref: fileRef.fullPath };
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image');
  }
}

export async function deleteImage(imageRef: string): Promise<void> {
  if (!imageRef) {
    console.warn('No image reference provided for deletion');
    return;
  }
  
  try {
    const imageRefObj = ref(storage, imageRef);
    await deleteObject(imageRefObj);
  } catch (error) {
    console.error('Error deleting image:', error);
    // Don't throw here to prevent blocking activity deletion due to image issues
  }
} 