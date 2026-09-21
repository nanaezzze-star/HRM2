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
} from "firebase/firestore";
import { db } from "@/config/firebase";
import type { Course } from "../types/course";

const courseCollection = collection(db, "course");
export const courseService = {
  getAllCourses: async (): Promise<Course[]> => {
    const snapAll = await getDocs(courseCollection); //take all docs snapshot
    return snapAll.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Course[];
  },

  getCourseByContent: async (
    content: "Lecture" | "Quiz" | "Course",
  ): Promise<Course[]> => {
    const q = query(courseCollection, where("content", "==", content)); //take course by content
    const snapCourseByContent = await getDocs(q);
    return snapCourseByContent.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Course[];
  },
  getCourseByAuthor: async (authorId: string): Promise<Course[]> => {
    const q = query(courseCollection, where("authorId", "==", authorId)); //take course by author Id
    const snapCourseByAuthor = await getDocs(q);
    return snapCourseByAuthor.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Course[];
  },

  getCourseById: async (id: string): Promise<Course | null> => {
    const getDocRef = doc(db, "course", id);
    const snapCourse = await getDoc(getDocRef); //take course by Id
    if (snapCourse.exists()) {
      return { id: snapCourse.id, ...snapCourse.data() } as Course;
    } else {
      return null;
    }
  },
  addCourse: async (courseData: Omit<Course, "id">): Promise<string> => {
    const addDocRef = await addDoc(courseCollection, courseData); //add course to DB
    return addDocRef.id;
  },

  deleteCourse: async (id: string): Promise<void> => {
    const deleteDocRef = doc(db, "course", id); //delete course by Id
    await deleteDoc(deleteDocRef);
  },

  updateCourse: async (
    id: string,
    courseData: Partial<Course>,
  ): Promise<void> => {
    const updateDocRef = doc(db, "course", id); //update course dy Id vith a new data
    await updateDoc(updateDocRef, courseData);
  },
};
