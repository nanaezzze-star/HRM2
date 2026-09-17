import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import type { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { courseService } from "../services/courseService";
import { getPageNumbers } from "@/shared/lib/pagination";
import type { ContentType } from "../types";

export function useCourses() {
  const [activeTab, setActiveTab] = useState<ContentType>("Course");
  //local inputs state
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedAuth, setSelectedAuth] = useState<string>("");
  //filiters state
  const [appliedSearch, setAppliedSearch] = useState<string>("");
  const [appliedAuth, setAppliedAuth] = useState<string>("");
  //pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [cursors, setCursors] = useState<
    (QueryDocumentSnapshot<DocumentData> | null)[]
  >([null]);

  const currentCursor = cursors[currentPage - 1] ?? null;

  const { data: pageResult, isLoading: loading } = useQuery({
    queryKey: [
      "courses-paginated",
      activeTab,
      currentPage,
      pageSize,
      currentCursor,
      appliedAuth,
      appliedSearch,
    ],
queryFn: async () => {
    try {
      return await courseService.getCoursesPaginated(activeTab, pageSize, currentCursor, {
        author: appliedAuth || undefined,
        searchQuery: appliedSearch || undefined,
      });
    } catch (err) {
      console.error("Firestore Query Error:", err);
      throw err;
    }
  },
});

  const courses = pageResult?.data || [];
  const hasMore = pageResult?.hasMore ?? false;

  useEffect(() => {
    if (pageResult?.lastDoc && cursors.length <= currentPage) {
      setCursors((prev) => [...prev, pageResult.lastDoc]);//save coursor into array
    }
  }, [pageResult, currentPage, cursors.length]);

  useEffect(() => {
    //reset to the first page
    setCurrentPage(1);
    setCursors([null]);
  }, [activeTab, pageSize]);

  const handleApply = () => {
    // trigger search on "Apply"
    setAppliedSearch(searchQuery);
    setAppliedAuth(selectedAuth);
    setCurrentPage(1);
    setCursors([null]);
  };

  // Reset inputs and applied filters on "Reset"
  const handleReset = () => {
    setSearchQuery("");
    setSelectedAuth("");
    setAppliedSearch("");
    setAppliedAuth("");
    setCurrentPage(1);
    setCursors([null]);
  };

  const totalPages = hasMore ? currentPage + 1 : currentPage;
  const pages = getPageNumbers(currentPage, totalPages);

  return {
    activeTab,

    setActiveTab,
    searchQuery,
    setSearchQuery,
    selectedAuth,
    setSelectedAuth,
    courses,
    totalCourses: courses.length,
    loading,
    handleApply,
    handleReset,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    totalPages,
    pages,
    canGoNext: hasMore,
    canGoPrev: currentPage > 1,
  };
}
