import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  Timestamp,
  type QueryDocumentSnapshot,
  type DocumentData,
} from "firebase/firestore";
import { db } from "@/shared/lib/firebase";
import type { Progress } from "../types";

const mapProgressDoc = (doc: QueryDocumentSnapshot<DocumentData>): Progress => {
  const data = doc.data();
  return {
    id: doc.id,
    ...data,
    startDate:
      data.startDate instanceof Timestamp
        ? data.startDate.toDate()
        : typeof data.startDate?.toDate === "function"
          ? data.startDate.toDate()
          : new Date(data.startDate),
  } as Progress;//create JS obj; take date or use new Date 
};

export interface PaginatedResult<T> {
  data: T[];
  lastDoc: QueryDocumentSnapshot<DocumentData> | null;
  hasMore: boolean;
}

const progressCollection = collection(db, "progress");

export const progressService = {
  getProgressesPaginated: async (
    pageSize: number,
    lastDoc?: QueryDocumentSnapshot<DocumentData> | null,
  ): Promise<PaginatedResult<Progress>> => {
    let q = query(
      progressCollection,
      orderBy("startDate", "desc"),
      limit(pageSize),
    );

    if (lastDoc) {
      q = query(
        progressCollection,
        orderBy("startDate", "desc"),
        startAfter(lastDoc),
        limit(pageSize),
      );
    }

    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(mapProgressDoc);
    const newLastDoc = snapshot.docs[snapshot.docs.length - 1] || null;

    return {
      data,
      lastDoc: newLastDoc,
      hasMore: snapshot.docs.length === pageSize,
    };
  },
};

// getProgressByUserId: async (userId: string): Promise<Progress[]> => {
//   const q = query(progressCollection, where("userId", "==", userId));
//   const snapProgressByUID = await getDocs(q);
//   return snapProgressByUID.docs.map(mapProgressDoc);
// },

// getProgressByCourseId: async (courseId: string): Promise<Progress[]> => {
//   const q = query(progressCollection, where("courseId", "==", courseId));
//   const snapCourseByCourseId = await getDocs(q);
//   return snapCourseByCourseId.docs.map(mapProgressDoc);
// },

// addProgress: async (progressData: Omit<Progress, "id">): Promise<string> => {
//   const addDocRef = await addDoc(progressCollection, progressData);
//   return addDocRef.id;
// },

// updateProgress: async (
//   id: string,
//   progressData: Partial<Progress>,
// ): Promise<void> => {
//   const updateDocRef = doc(db, "progress", id);
//   await updateDoc(updateDocRef, progressData);
// },
