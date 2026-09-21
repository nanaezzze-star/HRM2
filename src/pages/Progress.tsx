import {
  ProgressTableRow,
  ProgressFilters,
  useProgress,
} from "@/features/progress";

export default function Progress() {
  const {
    employees,
    loading,
    searchQuery,
    setSearchQuery,
    selectedPosition,
    setSelectedPosition,
    positions,
    handleReset,
    totalCount,
  } = useProgress();
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-button p-6 flex justify-center items-center text-sm text-gray-400">
        Loading...
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-button p-6 ">
      <main className="bg-white min-h-screen rounded-2xl border border-gray-bord">
        <ProgressFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedPosition={selectedPosition}
          onPositionChange={setSelectedPosition}
          positions={positions}
          onReset={handleReset}
          onApply={() => {}}
          totalCount={totalCount}
        />

        <div className="grid grid-cols-12 items-center px-6 py-3 bg-gray-button border-b border-gray-bord text-xs font-semibold text-gray-custom">
          <div className="col-span-2">User</div>
          <div className="col-span-2">Job title</div>
          <div className="col-span-2">Educational material</div>
          <div className="col-span-2">Time taken</div>
          <div className="col-span-1">Attempts</div>
          <div className="col-span-1">Grade</div>
        </div>

        <div>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <ProgressTableRow key={employee.userId} employee={employee} />
            ))
          ) : (
            <div className="p-8 text-center text-gray-400 text-sm">
              No employees found
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
