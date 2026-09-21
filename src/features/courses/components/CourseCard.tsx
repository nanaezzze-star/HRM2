import type { Course } from "../types/course";
import { EyeIcon } from "@/components/ui/EyeIcon";
import { AvatarGroup } from "@/components/ui/AvatarGroup";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const mockAvatars = [
    "https://i.pravatar.cc/100?img=1",
    "https://i.pravatar.cc/100?img=2",
    "https://i.pravatar.cc/100?img=3",
    "https://i.pravatar.cc/100?img=4",
  ];

  return (
    <article className="w-full border shadow-[0_0_14px_rgba(0,0,0,0.06)] rounded-lg overflow-hidden">
      {/* desktop*/}
      <div className="hidden md:grid grid-cols-12 items-center p-6 min-h-[8rem]">
        <div className="col-span-12 lg:col-span-4 flex items-center gap-4 min-w-0 pr-4 mb-4 lg:mb-0">
          <div
            className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-red-bgc 
          flex items-center justify-center flex-shrink-0"
          >
            <EyeIcon />
          </div>
          <div className="min-w-0">
            <p className="text-dark font-bold text-sm lg:text-base truncate">
              {course.name}
            </p>
            <p className="text-gray-custom font-medium text-xs lg:text-sm">
              {course.content}
            </p>
          </div>
        </div>
        <div
          className="col-span-6 lg:col-span-2 text-dark 
        font-semibold text-xs lg:text-sm text-center"
        >
          <p className="text-gray-custom mb-1">Category</p>
          <p>{course.category}</p>
        </div>
        <div
          className="col-span-6 lg:col-span-2 text-dark 
        font-semibold text-xs lg:text-sm text-center"
        >
          <p className="text-gray-custom mb-1">Students</p>
          <p>{course.numberOfStudents}</p>
        </div>
        <div
          className="col-span-6 lg:col-span-2 text-dark 
        font-semibold text-xs lg:text-sm text-center"
        >
          <p className="text-gray-custom mb-1">Passed</p>
          <p>{course.passedEducation}</p>
        </div>
        <div className="col-span-6 lg:col-span-2 flex justify-center">
          <AvatarGroup avatars={course.avatars || mockAvatars} max={3} />
        </div>
      </div>

      {/* mobile*/}
      <div className="md:hidden p-4 space-y-3">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-full bg-red-bgc 
          flex items-center justify-center flex-shrink-0"
          >
            <EyeIcon />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-dark font-bold text-sm truncate">
              {course.name}
            </p>
            <p className="text-gray-custom font-medium text-xs">
              {course.content}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="text-center p-2 bg-gray-button rounded-lg">
            <p className="text-gray-custom mb-1">Category</p>
            <p className="text-dark font-semibold">{course.category}</p>
          </div>
          <div className="text-center p-2 bg-gray-button rounded-lg">
            <p className="text-gray-custom mb-1">Students</p>
            <p className="text-dark font-semibold">{course.numberOfStudents}</p>
          </div>
          <div className="text-center p-2 bg-gray-button rounded-lg">
            <p className="text-gray-custom mb-1">Passed</p>
            <p className="text-dark font-semibold">{course.passedEducation}</p>
          </div>
          <div className="flex items-center justify-center p-2 bg-gray-button rounded-lg">
            <AvatarGroup avatars={course.avatars || mockAvatars} max={3} />
          </div>
        </div>
      </div>
    </article>
  );
}
