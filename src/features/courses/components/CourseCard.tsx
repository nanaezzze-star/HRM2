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
    <article className="w-full h-32 border shadow-[0_0_14px_rgba(0,0,0,0.06)] grid grid-cols-12 items-center p-6 ">
      <div className="col-span-4 flex items-center gap-4 min-w-0 pr-4">
        <div className="w-14 h-14 rounded-full bg-red-bgc flex items-center justify-center">
          <EyeIcon></EyeIcon>
        </div>
        <div className="m-4 text-base ">
          <p className="text-dark font-bold">{course.name}</p>
          <p className="text-gray-custom font-medium">{course.content}</p>
        </div>
      </div>
      <div className="text-dark font-semibold text-sm  col-span-2 text-center">
        <p>Category</p>
        <p>{course.category}</p>
      </div>
      <div className="text-dark font-semibold text-sm  col-span-2 text-center">
        <p>Number of students</p>
        <p>{course.numberOfStudents}</p>
      </div>
      <div className="text-dark font-semibold text-sm  col-span-2 text-center">
        <p>Passed education</p>
        <p>{course.passedEducation}</p>
      </div>
      <div className="col-span-2 text-center ">
        <AvatarGroup avatars={course.avatars || mockAvatars} max={3} />
      </div>
    </article>
  );
}
