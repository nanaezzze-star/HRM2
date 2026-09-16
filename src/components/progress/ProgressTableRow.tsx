import { useState } from "react";
import type { Employees } from "@/hooks/useProgress";
import DownIcon from "../ui/DownIcon";
import { formatDate, formatTime } from "@/utils/formatter";
import CourseIcon from "../ui/CourseIcon";
interface TableRowProps {
  employee: Employees;
}

export default function ProgressTableRow({ employee }: TableRowProps) {
  const [employeeOpen, setEmployeeOpen] = useState(false);
  const [openCourseId, setOpenCourseId] = useState<string | null>(null);

  return (
    <div className="">
      <div
        onClick={() => setEmployeeOpen((prev) => !prev)}
        className="grid grid-cols-12 items-center px-6 py-4 cursor-pointer hover:bg-gray-100/50 transition-colors select-none"
      >
        <div className="col-span-2 flex items-center gap-3">
          <img
            referrerPolicy="no-referrer"
            src={employee.userAvatarUrl || "/default-avatar.png"}
            alt={`${employee.userFirstName} ${employee.userLastName}`}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-sm font-semibold text-dark pr-16">
            {employee.userFirstName} {employee.userLastName}
          </span>
        </div>

        <div className="col-span-2 text-sm truncate">
          {employee.userPosition}
        </div>
        <div className="col-span-6" />

        <div className="col-span-2 flex justify-end">
          <DownIcon
            className={`w-4 h-4 transition-transform duration-200 ${
              employeeOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {employeeOpen && (
        <div className="bg-gray-button">
          {employee.courses.map((courseItem) => {
            const isCourseOpen = openCourseId === courseItem.id;
            const time = formatTime(courseItem.time);

            return (
              <div key={courseItem.id}>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenCourseId(isCourseOpen ? null : courseItem.id);
                  }}
                  className="grid grid-cols-12 items-center px-6 py-3.5 cursor-pointer"
                >
                  <div className="col-span-4 shrink-0" />

                  <div className="col-span-2 flex items-center gap-2.5 min-w-0 -ml-12">
                    <span className="flex items-center justify-center w-9 h-9 rounded-full bg-red-bgc ">
                      <CourseIcon />
                    </span>
                    <span className="text-sm font-medium text-dark truncate max-w-60">
                      {courseItem.courseName}
                    </span>
                  </div>

                  <div className="col-span-6 flex justify-end">
                    <DownIcon
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isCourseOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </div>

                {isCourseOpen && (
                  <div className="grid grid-cols-12 items-center px-6 py-3 bg-white text-sm min-w-0">
                    <div className="col-span-4" />

                    <div className="col-span-2 space-y-0.5">
                      <div className="font-medium text-dark truncate max-w-60">
                        {courseItem.courseName}
                      </div>
                      <div className="text-gray-custom">
                        {formatDate(courseItem.startDate)}
                      </div>
                    </div>

                    <div className="col-span-2 flex items-baseline gap-1 ">
                      {time ? (
                        <>
                          <span className="text-sm font-normal text-dark">
                            {time.mins}
                          </span>
                          <span className="text-xs font-normal text-gray-400 mr-1">
                            min
                          </span>
                          <span className="text-sm font-normal text-dark">
                            {time.secs}
                          </span>
                          <span className="text-xs font-normal text-gray-400">
                            sec
                          </span>
                        </>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </div>

                    <div className="col-span-1 text-gray-custom pl-6">
                      {courseItem.attempts ?? "-"}
                    </div>

                    <div className="col-span-1 text-gray-custom pl-5">
                      {courseItem.grade ?? "-"}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
