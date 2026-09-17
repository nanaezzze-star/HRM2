import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/shared/lib/firebase";
import type { User } from "../types";

export const userService = {
  //update fields
  updateUser: async (id: string, userData: Partial<User>): Promise<void> => {
    const updateDocRef = doc(db, "users", id);
    await updateDoc(updateDocRef, userData);
  },

  getUserById: async (id: string): Promise<User | null> => {
    //fetch user profile from DB by  UID
    const getDocRef = doc(db, "users", id);
    const snapUser = await getDoc(getDocRef);
    if (snapUser.exists()) {
      return { id: snapUser.id, ...snapUser.data() } as User;
    } else {
      return null;
    }
  },

  setUserWithId: async (id: string, userData: User): Promise<void> => {
    // Create or update user document
    const userDocRef = doc(db, "users", id);
    await setDoc(userDocRef, userData, { merge: true });
  },
};

// getAllUsers: async (): Promise<User[]> => {
//   const snapAll = await getDocs(usersCollection);
//   return snapAll.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//   })) as User[];
// },

// addUser: async (userData: Omit<User, "id">): Promise<string> => {
//   const addDocRef = await addDoc(usersCollection, userData);
//   return addDocRef.id;
// },

// deleteUser: async (id: string): Promise<void> => {
//   const deleteDocRef = doc(db, "users", id);
//   await deleteDoc(deleteDocRef);
// },

// getUserByRole: async (role: User["role"]): Promise<User[]> => {
//   const q = query(usersCollection, where("role", "==", role));
//   const snapUserByRole = await getDocs(q);
//   return snapUserByRole.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//   })) as User[];
// },
