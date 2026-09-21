import { useState, useEffect } from "react";
import type { Course } from "../types/course";
import { courseService } from "../services/courseService";

export type contentCourses = "Lecture" | "Quiz" | "Course";
export function useCourses() {
  const [activeTab, setActiveTab] = useState<contentCourses>("Course");
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedAuth, setSelectedAuth] = useState<string>("");

  useEffect(() => {
    let isMounted = true; //track component mount status
    setLoading(true);

    courseService
      .getCourseByContent(activeTab)
      .then((data) => {
        if (isMounted) setCourses(data);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        if (isMounted) setLoading(false); //update state if the component is still mounted
      });
    return () => {
      isMounted = false; //unmount or change active tab
    };
  }, [activeTab]);

  const authors = Array.from(
    new Set(courses.map((c) => c.authorName).filter(Boolean)), //unique list of authors
  );

  const filteredCourses = courses.filter((course) => {
    const search = course.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchAuthors = selectedAuth
      ? course.authorName === selectedAuth
      : true;

    return search && matchAuthors;
  });
  const handleReset = () => {
    setSearchQuery("");
    setSelectedAuth("");
  };
  return {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    selectedAuth,
    setSelectedAuth,
    authors,
    filteredCourses,
    loading,
    handleReset,
  };
}
