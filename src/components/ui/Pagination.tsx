import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination/Pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/pagination/Select";

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
    <div
      className="flex h-auto md:h-11 w-full items-center justify-between px-3 md:px-6 py-3 md:py-0
     bg-white text-xs font-medium text-gray-custom select-none border-t 
     shadow-[0_0_14px_rgba(0,0,0,0.06)] flex-wrap md:flex-nowrap gap-3 md:gap-0"
    >
      <div className="flex items-center gap-2 w-full md:w-auto justify-center md:justify-start">
        <ShadcnPagination className="w-auto mx-0">
          <PaginationContent className="gap-1">
            <PaginationItem>
              <PaginationPrevious
                onClick={() => canGoPrev && onPageChange(currentPage - 1)}
                className={`cursor-pointer ${!canGoPrev ? "pointer-events-none opacity-30" : ""}`}
              />
            </PaginationItem>

            {pages.map((page, idx) => {
              if (typeof page === "string") {
                return (
                  <PaginationItem key={`ellipsis-${idx}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }

              const isSelected = page === currentPage;

              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={isSelected}
                    onClick={() => onPageChange(page)}
                    className="cursor-pointer h-7 w-7 text-xs"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            <PaginationItem>
              <PaginationNext
                onClick={() => canGoNext && onPageChange(currentPage + 1)}
                className={`cursor-pointer ${!canGoNext ? "pointer-events-none opacity-30" : ""}`}
              />
            </PaginationItem>
          </PaginationContent>
        </ShadcnPagination>
        <Select
          value={String(pageSize)}
          onValueChange={(value) => onPageSizeChange(Number(value))}
        >
          <SelectTrigger className="h-7 text-xs bg-red-bgc text-red border-red-100 font-semibold px-2.5">
            <SelectValue placeholder={pageSize} />
          </SelectTrigger>
          <SelectContent>
            {[10, 20, 50, 100].map((size) => (
              <SelectItem key={size} value={String(size)} className="text-xs">
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
