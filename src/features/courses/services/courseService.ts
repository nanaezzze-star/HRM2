import {
  collection,
  getDocs,
  query,
  where,
  startAfter,
  QueryConstraint,
  documentId,
  type QueryDocumentSnapshot,
  type DocumentData,
} from "firebase/firestore";
import { db } from "@/shared/lib/firebase";
import type { Course, ContentType } from "../types";

export interface PaginatedResult<T> {
  data: T[];
  lastDoc: QueryDocumentSnapshot<DocumentData> | null;
  hasMore: boolean;
}
export interface CourseFilters {
  //filiters for courses
  author?: string;
  searchQuery?: string;
}

const courseCollection = collection(db, "course");

export const courseService = {
  getCoursesPaginated: async (
    //fetch paginated courses
    content: ContentType,
    pageSize: number,
    lastDoc?: QueryDocumentSnapshot<DocumentData> | null,
    filters?: CourseFilters,
  ): Promise<PaginatedResult<Course>> => {
    const queryConstraints: QueryConstraint[] = [
      where("content", "==", content),
    ]; // fetch courses by content

    if (filters?.author) {
      //narrowing filiter prarmeters
      queryConstraints.push(where("authorName", "==", filters.author));
    }
    // LIKE sql emulation
    if (filters?.searchQuery) {
      queryConstraints.push(where("name", ">=", filters.searchQuery)); // set lower bound for prefix search
      queryConstraints.push(
        // set upper bound for prefix match
        where("name", "<=", filters.searchQuery + "\uf8ff"),
      );
    }

    if (lastDoc) {
      queryConstraints.push(startAfter(lastDoc)); //fetch items after lastDoc
    }

    let q = query(courseCollection, ...queryConstraints);
    const snapshot = await getDocs(q);

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Course[];

    return {
      data,
      lastDoc: snapshot.docs[snapshot.docs.length - 1] || null, //next last doc
      hasMore: snapshot.docs.length === pageSize, //true if the page is full, indicating more items exist in DB
    };
  },
  async getCourseNamesByIds(ids: string[]): Promise<Map<string, string>> {

    if (!ids.length) return new Map();//enpty arr check

    const courseMap = new Map<string, string>();// cupple course id: course name

    const q = query(
      collection(db, "course"),
      where(documentId(), "in", ids.slice(0, 10)),//fetch courses with same id
    );

    const snapshot = await getDocs(q);
    snapshot.docs.forEach((docSnap) => {
      courseMap.set(docSnap.id, docSnap.data().name || docSnap.id);
    });

    return courseMap;
  },
};

// getAllCourses: async (): Promise<Course[]> => {
//   const snapAll = await getDocs(courseCollection);
//   return snapAll.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//   })) as Course[];
// },
// getCourseById: async (id: string): Promise<Course | null> => {
//   const getDocRef = doc(db, "course", id);
//   const snapCourse = await getDoc(getDocRef);
//   return snapCourse.exists()
//     ? ({ id: snapCourse.id, ...snapCourse.data() } as Course)
//     : null;
// },

// addCourse: async (courseData: Omit<Course, "id">): Promise<string> => {
//   const addDocRef = await addDoc(courseCollection, courseData);
//   return addDocRef.id;
// },

// deleteCourse: async (id: string): Promise<void> => {
//   await deleteDoc(doc(db, "course", id));
// },

// updateCourse: async (id: string, courseData: Partial<Course>): Promise<void> => {
//   await updateDoc(doc(db, "course", id), courseData);
// },
