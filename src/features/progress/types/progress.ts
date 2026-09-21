export interface Progress {
  id: string;
  startDate: Date;
  endDate?: Date;
  time?: number;
  attempts?: number;
  grade?: number;
  userId: string;
  courseId: string;
  userFirstName: string;
  userLastName: string;
  userPosition: string;
  userAvatarUrl?: string;
}
