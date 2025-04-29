import { db, storage } from '@/firebase/clientApp';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  deleteDoc, 
  updateDoc, 
  query,
  where,
  Timestamp,
  orderBy
} from 'firebase/firestore';
import { Volunteer, VolunteerFormData } from '@/types/volunteers';

const COLLECTION_NAME = 'volunteers';

// Add a new volunteer application
export const addVolunteer = async (data: VolunteerFormData): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...data,
      status: 'pending',
      createdAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding volunteer: ', error);
    throw error;
  }
};

// Get all volunteers with optional status filter
export const getVolunteers = async (status?: string): Promise<Volunteer[]> => {
  try {
    let volunteerQuery;
    
    if (status && status !== 'all') {
      volunteerQuery = query(
        collection(db, COLLECTION_NAME),
        where('status', '==', status),
        orderBy('createdAt', 'desc')
      );
    } else {
      volunteerQuery = query(
        collection(db, COLLECTION_NAME),
        orderBy('createdAt', 'desc')
      );
    }
    
    const querySnapshot = await getDocs(volunteerQuery);
    const volunteers: Volunteer[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      volunteers.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate().toISOString() || new Date().toISOString(),
      } as Volunteer);
    });
    
    return volunteers;
  } catch (error) {
    console.error('Error getting volunteers: ', error);
    throw error;
  }
};

// Export getVolunteers as fetchVolunteers as well for compatibility
export const fetchVolunteers = getVolunteers;

// Update volunteer status
export const updateVolunteerStatus = async (id: string, status: string): Promise<void> => {
  try {
    const volunteerRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(volunteerRef, { status });
  } catch (error) {
    console.error('Error updating volunteer status: ', error);
    throw error;
  }
};

// Update volunteer notes
export const updateVolunteerNotes = async (id: string, notes: string): Promise<void> => {
  try {
    const volunteerRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(volunteerRef, { notes });
  } catch (error) {
    console.error('Error updating volunteer notes: ', error);
    throw error;
  }
};

// Delete a volunteer
export const deleteVolunteer = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
  } catch (error) {
    console.error('Error deleting volunteer: ', error);
    throw error;
  }
}; 