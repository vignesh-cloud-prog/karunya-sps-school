export interface VolunteerFormData {
  name: string;
  email: string;
  phone: string;
  location: string;
  message: string;
  availability?: string[];
  interests?: string[];
  experience?: string;
}

export interface Volunteer extends VolunteerFormData {
  id: string;
  status: 'pending' | 'contacted' | 'approved' | 'rejected';
  createdAt: string;
  notes?: string;
} 