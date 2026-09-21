import { SearchIcon } from "@/components/ui/SearchIcon";

interface EmployeeFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedPosition: string;
  onPositionChange: (value: string) => void;
  positions: string[];
  onReset: () => void;
  onApply: () => void;
  onExport?: () => void;
  totalCount?: number;
}

export function ProgressFilters({
  searchQuery,
  onSearchChange,
  selectedPosition,
  onPositionChange,
  positions = [],
  onReset,
  onApply,
  onExport,
  totalCount = 2023,
}: EmployeeFiltersProps) {
  return (
    <div className="w-full p-6 space-y-4">
      <div className="flex items-center justify-between">

        <div className="relative w-72">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            type="text"
            placeholder="Surname, First Name"
            className="w-full h-10 bg-gray-50 text-sm text-dark placeholder:text-gray-400 pl-10 pr-4 rounded-lg outline-none border border-transparent focus:border-gray-200 transition-colors"
          />
        </div>

        <button
          type="button"
          onClick={onExport}
          className="flex items-center gap-2 text-sm font-medium text-red hover:opacity-80 transition-opacity"
        >
          <svg
            className="w-4 h-4 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>
          Export
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <select
            value={selectedPosition}
            onChange={(e) => onPositionChange(e.target.value)}
            className="appearance-none bg-white text-sm text-gray-custom border border-gray-button rounded-lg pl-3 pr-8 py-2 outline-none cursor-pointer min-w-[180px]"
          >
            <option value="">Position: All</option>
            {positions.map((pos) => (
              <option key={pos} value={pos}>
                Position: {pos}
              </option>
            ))}
          </select>

          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
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
          className="flex items-center gap-1.5 text-sm text-gray-custom border border-gray-button rounded-lg px-3 py-2"
        >
          <span>More</span>
          <span className="text-base leading-none text-gray-custom">+</span>
        </button>

        <button
          type="button"
          onClick={onReset}
          className="text-sm font-medium text-red  ml-2"
        >
          Reset
        </button>

        {/* Кнопка Apply */}
        <button
          type="button"
          onClick={onApply}
          className="bg-red text-white text-sm font-medium px-6 py-2 rounded-lg"
        >
          Apply
        </button>
      </div>

      <div className="pt-2 text-xs text-gray-custom">
        {totalCount.toLocaleString()} employees found
      </div>
    </div>
  );
}