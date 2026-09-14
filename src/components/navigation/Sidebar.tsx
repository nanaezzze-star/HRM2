import { Link } from "@tanstack/react-router";
import { UserIcon } from "../ui/UserIcon";
import { HierarchyIcon } from "../ui/HierarchyIcon";
import { ListIcon } from "../ui/ListIcon";
import { ClipboardIcon } from "../ui/ClipboardIcon";
import { CalendarIcon } from "../ui/CalendarIcon";
import { SettingsIcon } from "../ui/SettingsIcon";

export default function Sidebar() {
  return (
    <aside className="bg-white flext flex-col items-center h-full w-20 border-r shadow-[0_0_14px_rgba(0,0,0,0.06)]">
      <button className="w-full h-16 flex items-center justify-center border-l-4 border-transparent text-gray-custom">
        <UserIcon className="w-6 h-6" />
      </button>

      <Link
        to="/courses"
        className="w-full h-16 flex items-center justify-center border-l-4 transition-colors"
        inactiveProps={{
          className: "border-transparent text-gray-custom hover:bg-gray-50",
        }}
        activeProps={{
          className: "border-red bg-red-bgc text-red",
        }}
      >
        <HierarchyIcon className="w-6 h-6" />
      </Link>

      <Link
        to="/course/$courseId"
        params={{ courseId: "1" }}
        className="w-full h-16 flex items-center justify-center border-l-4 transition-colors"
        inactiveProps={{
          className: "border-transparent text-gray-custom hover:bg-gray-50",
        }}
        activeProps={{
          className: "border-red bg-red-bgc text-red",
        }}
      >
        <ListIcon className="w-6 h-6" />
      </Link>

      <button className="w-full h-16 flex items-center justify-center border-l-4 border-transparent text-gray-custom">
        <ClipboardIcon className="w-6 h-6" />
      </button>

      <button className="w-full h-16 flex items-center justify-center border-l-4 border-transparent text-gray-custom">
        <CalendarIcon className="w-6 h-6" />
      </button>

      <button className="w-full h-16 flex items-center justify-center border-l-4 border-transparent text-gray-custom">
        <SettingsIcon className="w-6 h-6" />
      </button>
    </aside>
  );
}
