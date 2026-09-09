import {
  collection,
  getDocs,
  doc,
  addDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Progress } from "@/types/progress";

const progressCollection = collection(db, "progress");
export const progressService = {
  getAllProgresses: async (): Promise<Progress[]> => {
    const snapAll = await getDocs(progressCollection); //take all docs snapshot
    return snapAll.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Progress[];
  },

  getProgressByUserId: async (userId: string): Promise<Progress[]> => {
    const q = query(progressCollection, where("userId", "==", userId)); //take progress by user Id
    const snapProgressByUID = await getDocs(q);
    return snapProgressByUID.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Progress[];
  },
  getProgressByCourseId: async (courseId: string): Promise<Progress[]> => {
    const q = query(progressCollection, where("courseId", "==", courseId)); //take progress by course Id
    const snapCourseByCourseId = await getDocs(q);
    return snapCourseByCourseId.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Progress[];
  },

  addProgress: async (
    progresData: Omit<Progress, "id">,
  ): Promise<string> => {
    const addDocRef = await addDoc(progressCollection, progresData); //add progress to DB
    return addDocRef.id;
  },

  updateProgress: async (
    id: string,
    progresData: Partial<Progress>,
  ): Promise<void> => {
    const updateDocRef = doc(db, "progress", id); //update progress dy Id vith a new data
    await updateDoc(updateDocRef, progresData);
  },
};
