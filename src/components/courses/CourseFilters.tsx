import { SearchIcon } from "../ui/SearchIcon";
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
    <div className="w-screen h-28 p-8">
      <div className="relative flex items-center w-72">
        <SearchIcon className="absolute left-4 w-[17px] h-[17px] text-gray-custom pointer-events-none" />
        <input
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          type="text"
          placeholder="Course name"
          className="w-full h-12 bg-gray-button text-gray-custom placeholder:text-gray-custom pl-11 pr-4 rounded-lg outline-none"
        />
      </div>

      <div className="flex items-center gap-8 pt-6">
        <div className="relative">
          <select
            value={selectedAuthor}
            onChange={(e) => onAuthorChange(e.target.value)}
            className="appearance-none bg-white text-sm text-gray-custom border border-gray-bord rounded-lg pl-4 pr-10 py-2 outline-none cursor-pointer hover:border-gray-300  w-56"
          >
            <option value="">Author: All</option>
            {authors.map((author) => (
              <option key={author} value={author}>
                Author: {author}
              </option>
            ))}
          </select>

          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-custom">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="text-sm font-medium text-red hover:opacity-80 transition-opacity"
        >
          Reset
        </button>

        <button
          type="button"
          onClick={onApply}
          className="bg-red text-white text-sm font-medium px-8 py-2 rounded-lg transition-colors w-28"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
