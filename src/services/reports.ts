import { db, storage } from '@/firebase/clientApp';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { Report, ReportFormData } from '@/types/reports';

const REPORTS_COLLECTION = 'reports';

export async function getReports(): Promise<Report[]> {
  try {
    const reportsRef = collection(db, REPORTS_COLLECTION);
    const q = query(reportsRef, orderBy('date', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Report[];
  } catch (error) {
    console.error('Error getting reports:', error);
    return [];
  }
}

export async function addReport(report: ReportFormData): Promise<void> {
  try {
    const reportsRef = collection(db, REPORTS_COLLECTION);
    await addDoc(reportsRef, report);
  } catch (error) {
    console.error('Error adding report:', error);
    throw new Error('Failed to add report');
  }
}

export async function updateReport(id: string, report: ReportFormData): Promise<void> {
  try {
    const reportRef = doc(db, REPORTS_COLLECTION, id);
    const updateData = {
      title: report.title,
      description: report.description,
      date: report.date,
      fileUrl: report.fileUrl,
      fileRef: report.fileRef,
    };
    await updateDoc(reportRef, updateData);
  } catch (error) {
    console.error('Error updating report:', error);
    throw new Error('Failed to update report');
  }
}

export async function deleteReport(id: string): Promise<void> {
  try {
    const reportRef = doc(db, REPORTS_COLLECTION, id);
    await deleteDoc(reportRef);
  } catch (error) {
    console.error('Error deleting report:', error);
    throw new Error('Failed to delete report');
  }
}

export async function uploadReportFile(file: File): Promise<{ url: string; ref: string }> {
  if (!file) {
    throw new Error('No file provided');
  }
  
  try {
    const fileRef = ref(storage, `reports/${uuidv4()}_${file.name}`);
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);
    return { url, ref: fileRef.fullPath };
  } catch (error) {
    console.error('Error uploading report file:', error);
    throw new Error('Failed to upload file');
  }
}

export async function deleteReportFile(fileRef: string): Promise<void> {
  if (!fileRef) {
    console.warn('No file reference provided for deletion');
    return;
  }
  
  try {
    const fileRefObj = ref(storage, fileRef);
    await deleteObject(fileRefObj);
  } catch (error) {
    console.error('Error deleting report file:', error);
    // Don't throw here to prevent blocking report deletion due to file issues
  }
} 