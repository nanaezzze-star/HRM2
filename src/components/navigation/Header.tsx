import { Logo } from "../ui/Logo";
import { SearchIcon } from "../ui/SearchIcon";
import { NotificationIcon } from "../ui/NotificationIcon";
import type { User } from "@/features/auth";
import DownIcon from "../ui/DownIcon";
import { Menu } from "lucide-react";

interface HeaderProps {
  user?: User | null;
  onMenuClick: () => void;
}

export default function Header({ user, onMenuClick }: HeaderProps) {
  return (
    <header className="w-full h-16 md:h-20 border-b shadow-[0_0_14px_rgba(0,0,0,0.06)] flex flex-row items-center px-2 md:px-3">
      <button
        onClick={onMenuClick}
        className="lg:hidden p-1.5 rounded-lg mr-1"
      >
        <Menu className="w-5 h-5 text-gray-custom" />
      </button>

      <Logo className="flex items-center h-full pr-2 md:pr-6 md:mr-6 py-4 px-1 scale-90 md:scale-100" />

      <div className="hidden md:block w-[1px] h-14 bg-gray-200 ml-4 mr-8" />

      <div className="flex flex-row items-center ml-auto gap-1 md:gap-4">
        <div className="hidden md:flex relative items-center w-48 lg:w-72">
          <SearchIcon className="absolute left-4 w-[17px] h-[17px] text-gray-custom pointer-events-none" />
          <input
            type="text"
            placeholder="Search"
            className="w-full h-10 md:h-12 bg-gray-button text-gray-custom placeholder:text-gray-custom pl-11 pr-4 rounded-lg outline-none text-sm"
          />
        </div>

        <div className="hidden md:flex flex-row items-center">
          <div className="text-sm">EN</div>

          <DownIcon className="w-4 h-4" />
        </div>

        <button className="p-1.5 md:p-2 rounded-lg">
          <NotificationIcon className="text-gray-custom w-7 h-7" />
        </button>

        {user && (
          <div className="flex items-center gap-1.5 md:gap-3 cursor-pointer pl-1">
            <img
              src={user.avatarUrl}
              alt={`${user.firstName} ${user.lastName}`}
              referrerPolicy="no-referrer"
              className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover flex-shrink-0"
            />

            <div className="hidden md:flex flex-col">
              <span className="text-dark font-semibold text-sm">
                {user.firstName} {user.lastName}
              </span>
              <span className="text-xs md:text-sm text-gray-custom font-normal">
                {user.position}
              </span>
            </div>
            <DownIcon className="hidden md:block w-4 h-4" />
          </div>
        )}
      </div>
    </header>
  );
}
