import { useState, useEffect, useMemo } from "react";
import { progressService } from "@/lib/progressService";
import type { Progress } from "@/types/progress";
import { courseService } from "@/lib/courseService";

export interface Employees {
  userId: string;
  userFirstName: string;
  userLastName: string;
  userPosition: string;
  userAvatarUrl?: string;
  courses: (Progress & { courseName?: string })[];
}

export function useProgress() {
  const [progress, setProgress] = useState<(Progress & { courseName?: string })[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedPosition, setSelectedPosition] = useState<string>("");

  useEffect(() => {
    Promise.all([
      progressService.getAllProgresses(),
      courseService.getAllCourses(),
    ])
      .then(([progressData, coursesData]) => {
        const courseMap = new Map(coursesData.map((c) => [c.id, c.name]));

        const enrichedProgress = progressData.map((item) => ({
          ...item,
          courseName: courseMap.get(item.courseId) || item.courseId,
        }));

        setProgress(enrichedProgress);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const rawEmployees = useMemo(() => {
    const map = new Map<string, Employees>(); //group by Uid

    progress.forEach((item) => {
      //create a new employee card
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
      map.get(item.userId)!.courses.push(item);
    });
    return Array.from(map.values());
  }, [progress]);

  const positions = useMemo(() => {
    return Array.from(
      new Set(rawEmployees.map((e) => e.userPosition).filter(Boolean)),
    );
  }, [rawEmployees]);

  const employees = useMemo(() => {
    return rawEmployees.filter((employee) => {
      const fullName =
        `${employee.userFirstName} ${employee.userLastName}`.toLowerCase();
      const matchesSearch = fullName.includes(searchQuery.toLowerCase());
      const matchesPosition = selectedPosition
        ? employee.userPosition === selectedPosition
        : true;

      return matchesSearch && matchesPosition;
    });
  }, [rawEmployees, searchQuery, selectedPosition]);

  const handleReset = () => {
    setSearchQuery("");
    setSelectedPosition("");
  };

  return {
    employees,
    loading,
    searchQuery,
    setSearchQuery,
    selectedPosition,
    setSelectedPosition,
    positions,
    handleReset,
    totalCount: employees.length,
  };
}
