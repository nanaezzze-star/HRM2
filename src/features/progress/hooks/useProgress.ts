import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import type { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { progressService } from "../services/progressService";
import { courseService } from "@/features/courses";
import { getPageNumbers } from "@/shared/lib/pagination";
import type { Progress, Employee } from "../types";

export function useProgress() {
  //search and filiter state
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedPosition, setSelectedPosition] = useState<string>("");
  const [appliedSearch, setAppliedSearch] = useState<string>("");
  const [appliedPosition, setAppliedPosition] = useState<string>("");
  //pgination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  //array coursor
  const [cursors, setCursors] = useState<
    (QueryDocumentSnapshot<DocumentData> | null)[]
  >([null]);

  const currentCursor = cursors[currentPage - 1] ?? null;

  // fetch paginated progress dat
  const { data: pageResult, isLoading } = useQuery({
    queryKey: ["progress-paginated", currentPage, pageSize, currentCursor],
    queryFn: () =>
      progressService.getProgressesPaginated(pageSize, currentCursor),
  });

  const allProgress = pageResult?.data || [];
  const hasMore = pageResult?.hasMore ?? false;

  // take courses id from progress data
  const courseIds = useMemo(() => {
    return Array.from(
      new Set(allProgress.map((p: Progress) => p.courseId).filter(Boolean)),
    );
  }, [allProgress]);

  //fwtch courses name based on Id
  const { data: courseMap = new Map<string, string>() } = useQuery({
    queryKey: ["course-names", courseIds],
    queryFn: () => courseService.getCourseNamesByIds(courseIds),
    enabled: courseIds.length > 0,
  });

  //save coursor for pagination
  useEffect(() => {
    if (pageResult?.lastDoc && cursors.length <= currentPage) {
      setCursors((prev) => [...prev, pageResult.lastDoc]);
    }
  }, [pageResult, currentPage, cursors.length]);

  //reset pagination
  useEffect(() => {
    setCurrentPage(1);
    setCursors([null]);
  }, [pageSize]);

  const allEmployees = useMemo(() => {
    if (!allProgress.length) return [];

    const map = new Map<string, Employee>();

    allProgress.forEach((item: Progress) => {
      //create user entry if it doesn't exist
      if (!map.has(item.userId)) {
        map.set(item.userId, {
          userId: item.userId,
          userFirstName: item.userFirstName,
          userLastName: item.userLastName,
          userPosition: item.userPosition,
          userAvatarUrl: item.userAvatarUrl,
          courses: [],
        });
      }
      //attach course to the user
      map.get(item.userId)!.courses.push({
        ...item,
        courseName: courseMap.get(item.courseId) || item.courseId,
      });
    });

    return Array.from(map.values());
  }, [allProgress, courseMap]);

  //extract positions for a dropdown
  const positions = useMemo(() => {
    return Array.from(
      new Set(allEmployees.map((e) => e.userPosition).filter(Boolean)),
    );
  }, [allEmployees]);

  // filter employees based on search and position
  const filteredEmployees = useMemo(() => {
    return allEmployees.filter((employee) => {
      const fullName =
        `${employee.userFirstName} ${employee.userLastName}`.toLowerCase();
      const matchesSearch = fullName.includes(appliedSearch.toLowerCase());
      const matchesPosition = appliedPosition
        ? employee.userPosition === appliedPosition
        : true;

      return matchesSearch && matchesPosition;
    });
  }, [allEmployees, appliedSearch, appliedPosition]);

  const handleApply = () => {
    setAppliedSearch(searchQuery);
    setAppliedPosition(selectedPosition);
  };

  const handleReset = () => {
    setSearchQuery("");
    setSelectedPosition("");
    setAppliedSearch("");
    setAppliedPosition("");
  };
  // pagination calculations
  const pages = getPageNumbers(
    currentPage,
    hasMore ? currentPage + 1 : currentPage,
  );
  const canGoNext = hasMore;
  const canGoPrev = currentPage > 1;

  return {
    employees: filteredEmployees,
    loading: isLoading,
    searchQuery,
    setSearchQuery,
    selectedPosition,
    setSelectedPosition,
    positions,
    handleReset,
    totalCount: filteredEmployees.length,
    currentPage,
    setCurrentPage,
    totalPages: hasMore ? currentPage + 1 : currentPage,
    pageSize,
    setPageSize,
    pages,
    canGoNext,
    canGoPrev,
    handleApply,
  };
}
