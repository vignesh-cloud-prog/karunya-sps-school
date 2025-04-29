import { db, storage } from '@/firebase/clientApp';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

export interface Program {
  id: string;
  title: string;
  description: string;
  image: string;
  imageRef?: string;
  order: number;
  created_at: string;
}

export const getPrograms = async (): Promise<Program[]> => {
  try {
    const programsRef = collection(db, 'programs');
    const q = query(programsRef, orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Program[];
  } catch (error) {
    console.error('Error fetching programs:', error);
    return [];
  }
};

export const addProgram = async (program: Omit<Program, 'id' | 'created_at'>): Promise<Program | null> => {
  try {
    const programsRef = collection(db, 'programs');
    const docRef = await addDoc(programsRef, {
      ...program,
      created_at: new Date().toISOString()
    });
    
    return {
      id: docRef.id,
      ...program,
      created_at: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error adding program:', error);
    return null;
  }
};

export const updateProgram = async (id: string, program: Partial<Program>): Promise<Program | null> => {
  try {
    const programRef = doc(db, 'programs', id);
    await updateDoc(programRef, program);
    
    return {
      id,
      ...program
    } as Program;
  } catch (error) {
    console.error('Error updating program:', error);
    return null;
  }
};

export const deleteProgram = async (id: string, imageRef?: string): Promise<boolean> => {
  try {
    // Delete the image from storage if it exists
    if (imageRef) {
      await deleteImage(imageRef);
    }
    
    // Delete the document from Firestore
    const programRef = doc(db, 'programs', id);
    await deleteDoc(programRef);
    return true;
  } catch (error) {
    console.error('Error deleting program:', error);
    return false;
  }
};

export const uploadProgramImage = async (file: File): Promise<{ url: string; ref: string }> => {
  if (!file) {
    throw new Error('No file provided');
  }
  
  try {
    const fileRef = ref(storage, `programs/${uuidv4()}_${file.name}`);
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);
    return { url, ref: fileRef.fullPath };
  } catch (error) {
    console.error('Error uploading program image:', error);
    throw new Error('Failed to upload image');
  }
};

export const deleteImage = async (imageRef: string): Promise<void> => {
  if (!imageRef) {
    console.warn('No image reference provided for deletion');
    return;
  }
  
  try {
    const imageRefObj = ref(storage, imageRef);
    await deleteObject(imageRefObj);
  } catch (error) {
    console.error('Error deleting image:', error);
    // Don't throw here to prevent blocking program deletion due to image issues
  }
}; 