import { useCourses } from "@/hooks/useCourses";
import { CourseCard } from "@/components/courses/CourseCard";
import { ContentTabs } from "@/components/courses/ContentTabs";
import { CourseFilters } from "@/components/courses/CourseFilters";


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

  return (
    <div className="min-h-screen bg-gray-button p-6 ">
    <main  className="bg-white min-h-screen rounded-2xl border border-gray-bord">
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

          <div className="px-6 text-sm text-gray-custom font-medium pt-16 pl-8">
            {loading ? "Loading..." : `${filteredCourses.length} courses found`}
          </div>

          <section aria-label="Courses list" className="px-6 space-y-4 pt-6">
            {loading ? (
              <div className="py-12 text-center text-gray-custom">Loading courses...</div>
            ) : filteredCourses.length === 0 ? (
              <div className="py-12 text-center text-gray-custom">No courses found</div>
            ) : (
              filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))
            )}
          </section>


    </main>

</div>


  );
}
