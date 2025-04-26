export interface Report {
  id: string;
  title: string;
  description: string;
  date: string;
  fileUrl: string;
  fileRef: string;
}

export interface ReportFormData {
  title: string;
  description: string;
  date: string;
  fileUrl: string;
  fileRef: string;
} 