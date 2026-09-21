import { useMemo, useState } from "react";
interface UsePaginationProps<T> {
  data: T[];
  initialPageSize?: number;
}

export function usePagination<T>({
  data,
  initialPageSize = 10,
}: UsePaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState(1); //active page
  const [pageSize, setPageSize] = useState(initialPageSize);

  const totalPages = Math.ceil(data.length / pageSize);

  const paginatedData = useMemo(() => {
    //fetch data for current page
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, pageSize]);

  const pages = useMemo(() => {
    //pages array
    const result: (number | string)[] = [];
    const maxVisible = 7;

    if (totalPages <= maxVisible) {
      //show all pages if total is within limit
      for (let i = 1; i <= totalPages; i++) {
        result.push(i);
      }
    } else {
      result.push(1); // always include page 1

      if (currentPage > 3) {
        result.push("...");
      }

      const start = Math.max(2, currentPage - 1); //windows arround current pag
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        result.push(i);
      }

      if (currentPage < totalPages - 2) {
        result.push("...");
      }

      result.push(totalPages); //always show last page
    }

    return result;
  }, [currentPage, totalPages]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    const currentFirstItem = (currentPage - 1) * pageSize;
    const newPage = Math.floor(currentFirstItem / newSize) + 1;
    setCurrentPage(newPage);
  };

  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return {
    paginatedData,
    currentPage,
    totalPages,
    pageSize,
    pages,
    canGoPrev,
    canGoNext,
    handlePageChange,
    handlePageSizeChange,
  };
}
