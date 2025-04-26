import { db, storage } from '@/firebase/clientApp';
import { updateDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

export interface AboutContent {
  id: string;
  title: string;
  subtitle: string;
  description1: string;
  description2: string;
  images: string[];
}

// Default content for static generation
const DEFAULT_ABOUT_CONTENT: Omit<AboutContent, 'id'> = {
  title: 'About Us',
  subtitle: 'Karunya Special School',
  description1: 'Our NGO believes that all children should be given equal opportunities and see that they grow up in a decent environment and become the proud citizens of the country.',
  description2: 'Karunya Special School strives to rehabilitate the special children by training them to acquire special skill and lead an independent life. Special children include those with autism, mental retardation, down syndrome and slow learners.',
  images: [
    'https://firebasestorage.googleapis.com/v0/b/karunya-sps-school.appspot.com/o/about%2Fdefault-about-1.jpg?alt=media',
    'https://firebasestorage.googleapis.com/v0/b/karunya-sps-school.appspot.com/o/about%2Fdefault-about-2.jpg?alt=media'
  ]
};

// Get about content from Firestore or use default
export async function getAboutContent(): Promise<AboutContent> {
  try {
    const aboutDocRef = doc(db, 'about', 'content');
    const aboutDoc = await getDoc(aboutDocRef);
    
    if (aboutDoc.exists()) {
      const data = aboutDoc.data();
      console.log('Fetched about content from Firestore:', {
        ...data,
        images: data.images?.map((url: string) => url.substring(0, 100) + '...')
      });
      return { id: aboutDoc.id, ...data } as AboutContent;
    } else {
      // If no document exists, create one with default content
      console.log('Creating new about content with defaults');
      await setDoc(aboutDocRef, DEFAULT_ABOUT_CONTENT);
      return { id: 'content', ...DEFAULT_ABOUT_CONTENT };
    }
  } catch (error) {
    console.error('Error getting about content:', error);
    // Return default content if there's an error
    return { id: 'content', ...DEFAULT_ABOUT_CONTENT };
  }
}

// Update about content
export async function updateAboutContent(content: Omit<AboutContent, 'id'>): Promise<void> {
  try {
    console.log('Updating about content:', content);
    const aboutDocRef = doc(db, 'about', 'content');
    await updateDoc(aboutDocRef, content);
  } catch (error) {
    console.error('Error updating about content:', error);
    throw new Error('Failed to update about content');
  }
}

// Upload image to Firebase Storage and return the URL
export async function uploadAboutImage(file: File): Promise<string> {
  try {
    console.log('Uploading image:', file.name);
    const storageRef = ref(storage, `about/${uuidv4()}_${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    console.log('Image uploaded successfully:', downloadURL);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading about image:', error);
    throw new Error('Failed to upload image');
  }
}

// Delete image from Firebase Storage and update about content
export async function deleteAboutImage(imageUrl: string): Promise<void> {
  try {
    console.log('Deleting image:', imageUrl);
    
    // Extract the path from the URL
    const imagePath = imageUrl.split('?')[0].split('/o/')[1]?.replace(/%2F/g, '/');
    
    if (imagePath) {
      const imageRef = ref(storage, imagePath);
      await deleteObject(imageRef);
      console.log('Image deleted from storage');
    }
    
    // Remove the image URL from the about content
    const aboutContent = await getAboutContent();
    const updatedImages = aboutContent.images.filter(url => url !== imageUrl);
    
    await updateAboutContent({
      ...aboutContent,
      images: updatedImages
    });
    
    console.log('Image removed from about content');
  } catch (error) {
    console.error('Error deleting about image:', error);
    throw new Error('Failed to delete image');
  }
} 