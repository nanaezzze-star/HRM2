import {
  useCourses,
  CourseCard,
  ContentTabs,
  CourseFilters,
} from "@/features/courses";
import { Pagination } from "@/shared/ui/Pagination";

export default function Courses() {
  const {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    selectedAuth,
    setSelectedAuth,
    courses,
    totalCourses,
    loading,
    handleApply,
    handleReset,
    currentPage,
    setCurrentPage,
    totalPages,
    pageSize,
    setPageSize,
    pages,
    canGoNext,
    canGoPrev,
  } = useCourses();

  const AUTHORS = ["Esther Howard", "Cody Fisher"];

  return (
    <div className="min-h-screen bg-gray-button p-6 pb-0">
      <main className="bg-white min-h-screen rounded-2xl border border-gray-bord">
        <ContentTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <CourseFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedAuthor={selectedAuth}
          onAuthorChange={setSelectedAuth}
          authors={AUTHORS}
          onReset={handleReset}
          onApply={handleApply}
        />

        <div className="px-6 text-sm text-gray-custom font-medium pt-16 pl-8">
          {loading ? "Loading..." : `${totalCourses} courses found`}
        </div>

        <section aria-label="Courses list" className="px-6 space-y-4 pt-6 pb-6">
          {loading ? (
            <div className="py-12 text-center text-gray-custom">
              Loading courses...
            </div>
          ) : courses.length === 0 ? (
            <div className="py-12 text-center text-gray-custom">
              No courses found
            </div>
          ) : (
            courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))
          )}
        </section>

        <div className="sticky bottom-0 z-10 flex h-11 w-full items-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            pages={pages}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
            canGoNext={canGoNext}
            canGoPrev={canGoPrev}
          />
        </div>
      </main>
    </div>
  );
}
