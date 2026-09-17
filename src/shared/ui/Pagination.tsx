import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  pages: (number | string)[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  canGoNext: boolean;
  canGoPrev: boolean;
}

export function Pagination({
  currentPage,
  pageSize,
  pages,
  onPageChange,
  onPageSizeChange,
  canGoNext,
  canGoPrev,
}: PaginationProps) {
  return (
    <div className="flex h-11 w-full items-center justify-between px-6 bg-white text-xs font-medium text-gray-custom select-none border-t shadow-[0_0_14px_rgba(0,0,0,0.06)]">
      <div className="flex items-center gap-2">
        <button
          disabled={!canGoPrev}
          onClick={() => onPageChange(currentPage - 1)}
          className="p-1.5 rounded-md hover:bg-gray-button text-gray-custom disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1">
          {pages.map((page, idx) => {
            if (typeof page === "string") {
              return (
                <span
                  key={`ellipsis-${idx}`}
                  className="px-1.5 text-gray-custom"
                >
                  {page}
                </span>
              );
            }

            const isSelected = page === currentPage;

            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`w-7 h-7 flex items-center justify-center rounded-md text-xs font-medium transition-colors ${
                  isSelected
                    ? "bg-grey-button text-red font-semibold"
                    : "text-gray-custom hover:bg-gray-button"
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>

        <button
          disabled={!canGoNext}
          onClick={() => onPageChange(currentPage + 1)}
          className="p-1.5 rounded-md hover:bg-gray-button text-gray-custom disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <div className="relative ml-2">
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="appearance-none bg-red-bgc text-red border border-red-100 font-semibold px-3 py-1 pr-6 rounded-md text-xs outline-none cursor-pointer"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-red absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
      </div>
  );
}
