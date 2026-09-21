import { Link } from "@tanstack/react-router";
import { UserIcon } from "../ui/UserIcon";
import { HierarchyIcon } from "../ui/HierarchyIcon";
import { ListIcon } from "../ui/ListIcon";
import { ClipboardIcon } from "../ui/ClipboardIcon";
import { CalendarIcon } from "../ui/CalendarIcon";
import { SettingsIcon } from "../ui/SettingsIcon";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          bg-white flex flex-col items-center h-full w-20 border-r shadow-[0_0_14px_rgba(0,0,0,0.06)]
  
          
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
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
          onClick={() => onClose()}
        >
          <HierarchyIcon className="w-6 h-6" />
        </Link>

        <Link
          to="/progress"
          className="w-full h-16 flex items-center justify-center border-l-4 transition-colors"
          inactiveProps={{
            className: "border-transparent text-gray-custom hover:bg-gray-50",
          }}
          activeProps={{
            className: "border-red bg-red-bgc text-red",
          }}
          onClick={() => onClose()}
        >
          <ListIcon className="w-6 h-6" />
        </Link>

        <Link
          to="/classroom"
          className="w-full h-16 flex items-center justify-center border-l-4 transition-colors"
          inactiveProps={{
            className: "border-transparent text-gray-custom hover:bg-gray-50",
          }}
          activeProps={{
            className: "border-red bg-red-bgc text-red",
          }}
          onClick={() => onClose()}
        >
          <ClipboardIcon className="w-6 h-6" />
        </Link>

        <button className="w-full h-16 flex items-center justify-center border-l-4 border-transparent text-gray-custom">
          <CalendarIcon className="w-6 h-6" />
        </button>

        <button className="w-full h-16 flex items-center justify-center border-l-4 border-transparent text-gray-custom">
          <SettingsIcon className="w-6 h-6" />
        </button>
      </aside>
    </>
  );
}
