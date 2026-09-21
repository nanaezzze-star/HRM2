import { SearchIcon } from "@/components/ui/SearchIcon";
import { GrayDropdownIcon } from "@/components/ui/GrayDropdownIcon";

interface CourseFilterProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedAuthor: string;
  onAuthorChange: (value: string) => void;
  onReset: () => void;
  onApply: () => void;
  authors: string[];
}

export function CourseFilters({
  searchQuery,
  onSearchChange,
  selectedAuthor,
  onAuthorChange,
  onReset,
  onApply,
  authors = [],
}: CourseFilterProps) {
  return (
    <div className="w-full p-4 md:p-8">
      <div className="relative flex items-center w-full md:w-72">
        <SearchIcon className="absolute left-4 w-[17px] h-[17px] text-gray-custom pointer-events-none" />
        <input
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          type="text"
          placeholder="Course name"
          className="w-full h-12 bg-gray-button text-gray-custom placeholder:text-gray-custom pl-11 pr-4 rounded-lg outline-none"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3 md:gap-8 pt-4 md:pt-6">
        <div className="relative w-full md:w-56">
          <select
            value={selectedAuthor}
            onChange={(e) => onAuthorChange(e.target.value)}
            className="appearance-none bg-white text-sm text-gray-custom border border-gray-bord rounded-lg pl-4 pr-10 py-2 outline-none cursor-pointer hover:border-gray-300 w-full"
          >
            <option value="">Author: All</option>
            {authors.map((author) => (
              <option key={author} value={author}>
                Author: {author}
              </option>
            ))}
          </select>

          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-custom">
            <GrayDropdownIcon />
          </span>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="text-sm font-medium text-red"
        >
          Reset
        </button>

        <button
          type="button"
          onClick={onApply}
          className="bg-red text-white text-sm font-medium 
          px-6 md:px-8 py-2 rounded-lg transition-colors w-full md:w-28"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
