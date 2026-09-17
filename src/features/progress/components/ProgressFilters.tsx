import { SearchIcon } from "@/shared/ui/SearchIcon";
import { ExportIcon } from "@/shared/ui/ExportIcon";
import { ChevronDownIcon } from "@/shared/ui/ChevronDownIcon";

interface EmployeeFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedPosition: string;
  onPositionChange: (value: string) => void;
  positions: string[];
  onReset: () => void;
  onApply: () => void;
  onExport?: () => void;
  totalCount: number;
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
  totalCount,
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
          <ExportIcon/>
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
            <ChevronDownIcon />
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
