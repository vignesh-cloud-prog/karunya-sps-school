export interface TeamMember {
  id: string;
  name: string;
  position: string;
  description: string;
  image: string;
  imageRef: string;
  order: number;
}

export interface TeamFormData {
  name: string;
  position: string;
  description: string;
  image: string;
  imageRef: string;
  order: number;
} 