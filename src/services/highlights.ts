import { db } from '@/firebase/clientApp';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

export interface Highlight {
  id: string;
  image: string;
  title: string;
  description: string;
  tagline: string;
}

export async function getHighlights(): Promise<Highlight[]> {
  try {
    const highlightsRef = collection(db, 'highlights');
    const querySnapshot = await getDocs(highlightsRef);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Highlight);
  } catch (error) {
    console.error('Error getting highlights:', error);
    return [];
  }
}

export async function addHighlight(highlight: Omit<Highlight, 'id'>): Promise<void> {
  try {
    const highlightsRef = collection(db, 'highlights');
    await addDoc(highlightsRef, highlight);
  } catch (error) {
    console.error('Error adding highlight:', error);
    throw new Error('Failed to add highlight');
  }
}

export async function updateHighlight(id: string, highlight: Omit<Highlight, 'id'>): Promise<void> {
  try {
    const highlightRef = doc(db, 'highlights', id);
    await updateDoc(highlightRef, highlight);
  } catch (error) {
    console.error('Error updating highlight:', error);
    throw new Error('Failed to update highlight');
  }
}

export async function deleteHighlight(id: string): Promise<void> {
  try {
    const highlightRef = doc(db, 'highlights', id);
    await deleteDoc(highlightRef);
  } catch (error) {
    console.error('Error deleting highlight:', error);
    throw new Error('Failed to delete highlight');
  }
} 