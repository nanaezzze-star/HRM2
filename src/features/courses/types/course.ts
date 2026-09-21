export interface Course {
  id: string;
  name: string;
  content: "Lecture" | "Quiz"| "Course";
  category: string;
  numberOfStudents: number;
  passedEducation: number;
  avatars?: string[];
  authorId: string;
  authorName: string;
}
