import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  setDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import type { User } from "@/types/user";

const usersCollection = collection(db, "users");

export const userService = {
  getAllUsers: async (): Promise<User[]> => {
    const snapAll = await getDocs(usersCollection); //take all docs snapshot
    return snapAll.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as User[];
  },

  getUserById: async (id: string): Promise<User | null> => {
    const getDocRef = doc(db, "users", id);
    const snapUser = await getDoc(getDocRef); //take user by id
    if (snapUser.exists()) {
      return { id: snapUser.id, ...snapUser.data() } as User;
    } else {
      return null;
    }
  },

  addUser: async (userData: Omit<User, "id">): Promise<string> => {
    const addDocRef = await addDoc(usersCollection, userData); //add user to DB
    return addDocRef.id;
  },

  deleteUser: async (id: string): Promise<void> => {
    //delete user by Id
    const deleteDocRef = doc(db, "users", id);
    await deleteDoc(deleteDocRef);
  },

  updateUser: async (id: string, userData: Partial<User>): Promise<void> => {
    const updateDocRef = doc(db, "users", id); //update user dy Id vith a new data
    await updateDoc(updateDocRef, userData);
  },

  getUserByRole: async (role: User["role"]): Promise<User[]> => {
    const q = query(usersCollection, where("role", "==", role));
    const snapUserByRole = await getDocs(q); // get user by role "employee" | "author" | "admin"
    return snapUserByRole.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as User[];
  },
  setUserWithId: async (id: string, userData: User): Promise<void> => {
  const userDocRef = doc(db, "users", id);
  await setDoc(userDocRef, userData, { merge: true }); 
},
};
