import { Logo } from "@/shared/ui/Logo";
import { SearchIcon } from "@/shared/ui/SearchIcon";
import { NotificationIcon } from "@/shared/ui/NotificationIcon";
import type { User } from "@/features/auth";
import DownIcon from "@/shared/ui/DownIcon";
export default function Header({ user }: { user?: User | null }) {
  return (
    <header className="w-full h-20 border-b shadow-[0_0_14px_rgba(0,0,0,0.06)] flex flex-row items-center pl-3">
      <Logo className=" flex items-center h-full pr-6 mr-6  py-4 px-2"></Logo>
      <div className="w-[1px] h-14 bg-gray-200 ml-4 mr-8" />
      <div className="flex flex-row items-center ml-auto">
        <div className="relative flex items-center w-72">
          <SearchIcon className="absolute left-4 w-[17px] h-[17px] text-gray-custom pointer-events-none" />
          <input
            type="text"
            placeholder="Search"
            className="w-full h-12 bg-gray-button text-gray-custom placeholder:text-gray-custom pl-11 pr-4 rounded-lg outline-none"
          />
        </div>
        <div className="flex flex-row items-center m-6">
          <div>EN</div>
          <DownIcon />
        </div>
        <div className="flex flex-row items-center w-64 h-12 gap-4 mr-4">
          <NotificationIcon className="text-gray-custom"></NotificationIcon>
          {user && (
            <div className="flex items-center gap-3 cursor-pointer">
              <img
                src={user.avatarUrl || "/default-avatar.png"}
                alt={`${user.firstName} ${user.lastName}`}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <span className=" text-dark font-semibold text-sm">
                  {user.firstName} {user.lastName}
                </span>
                <span className="text-sm text-gray-custom font-normal">
                  {user.position}
                </span>
              </div>
              <DownIcon />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
