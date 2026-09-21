import {
  useCourses,
  CourseCard,
  ContentTabs,
  CourseFilters,
} from "@/features/courses";
import { usePagination } from "@/hooks/usePagination";
import { Pagination } from "@/components/ui/Pagination";

export default function Courses() {
const {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    selectedAuth,
    setSelectedAuth,
    authors,
    filteredCourses,
    loading,
    handleReset,
  } = useCourses();

  const {
    paginatedData,
    currentPage,
    totalPages,
    pageSize,
    pages,
    canGoPrev,
    canGoNext,
    handlePageChange,
    handlePageSizeChange,
  } = usePagination({
    data: filteredCourses,
    initialPageSize: 10,
  });

  return (
    <div className="min-h-screen bg-gray-button p-3 md:p-6">
      <main className="bg-white rounded-2xl border border-gray-bord flex flex-col">
        <ContentTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <CourseFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedAuthor={selectedAuth}
          onAuthorChange={setSelectedAuth}
          authors={authors}
          onReset={handleReset}
          onApply={() => {}}
        />

        <div className="px-4 md:px-6 text-sm text-gray-custom font-medium pt-8 md:pt-16 pl-4 md:pl-8">
          {loading ? "Loading..." : `${filteredCourses.length} courses found`}
        </div>

        <section
          aria-label="Courses list"
          className="px-3 md:px-6 space-y-4 pt-6 flex-1 pb-4"
        >
          {loading ? (
            <div className="py-12 text-center text-gray-custom">
              Loading courses...
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="py-12 text-center text-gray-custom">
              No courses found
            </div>
          ) : (
            paginatedData.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))
          )}
        </section>

        {!loading && filteredCourses.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            pages={pages}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            canGoNext={canGoNext}
            canGoPrev={canGoPrev}
          />
        )}
      </main>
    </div>
  );
}
