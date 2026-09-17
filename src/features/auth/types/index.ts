export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "employee" | "author" | "admin";
  position: string;
  avatarUrl?: string;
}
