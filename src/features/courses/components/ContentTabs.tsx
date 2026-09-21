export type ContentType = "Course" | "Lecture" | "Quiz";
interface ContentTabsProps {
  activeTab: ContentType;
  onTabChange: (tab: ContentType) => void;
}

export function ContentTabs({ activeTab, onTabChange }: ContentTabsProps) {
  return (
<div className="border-b border-contrast-bord w-full">
      <nav className="-mb-px flex gap-2 pl-8">
        <button
          type="button"
          onClick={() => onTabChange("Course")}
          className={`px-6 pt-4 pb-3 text-sm transition-all border-b-2 ${
            activeTab === "Course"
              ? "border-red text-dark font-bold"
              : "border-transparent text-gray-custom hover:text-dark font-medium"
          }`}
        >
          Courses
        </button>

        <button
          type="button"
          onClick={() => onTabChange("Lecture")}
          className={`px-6 pt-4 pb-3 text-sm transition-all border-b-2 ${
            activeTab === "Lecture"
              ? "border-red text-dark font-bold"
              : "border-transparent text-gray-custom hover:text-dark font-medium"
          }`}
        >
          Lectures
        </button>

        <button
          type="button"
          onClick={() => onTabChange("Quiz")}
          className={`px-6 pt-4 pb-3 text-sm transition-all border-b-2 ${
            activeTab === "Quiz"
              ? "border-red text-dark font-bold"
              : "border-transparent text-gray-custom hover:text-dark font-medium"
          }`}
        >
          Quizzes
        </button>
      </nav>
    </div>
  );
}
