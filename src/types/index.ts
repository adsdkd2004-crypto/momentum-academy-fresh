export type UserRole = "admin" | "student";
export type StudentStatus = "pending" | "approved" | "rejected" | "suspended";

export interface StudentProfile {
  uid: string;
  name: string;
  email: string;
  photoURL?: string;
  role: UserRole;
  status: StudentStatus;
  className: "Class 9" | "Class 10" | "";
  createdAt: number;
  approvedAt?: number;
}

export type SubjectName = "Mathematics" | "Science" | "English" | "Social Science";
export type MaterialType = "Handwritten Notes" | "DPP" | "Question & Answer" | "Video";

/** Firestore document shape: classes/{classId}/subjects/{subjectId}/chapters/{chapterId} */
export interface Chapter {
  id: string;
  classId: "class-9" | "class-10";
  subject: SubjectName;
  title: string;
  order: number;
}

/** Firestore document shape: materials/{materialId} */
export interface Material {
  id: string;
  chapterId: string;
  classId: "class-9" | "class-10";
  subject: SubjectName;
  chapterTitle: string;
  type: MaterialType;
  fileName: string;
  fileURL: string;
  fileSizeKB: number;
  uploadedAt: number;
  updatedAt: number;
}

export interface Notice {
  id: string;
  title: string;
  body: string;
  postedAt: number;
  pinned?: boolean;
}
