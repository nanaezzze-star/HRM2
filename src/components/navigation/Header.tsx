import { Logo } from "../ui/Logo";
import { SearchIcon } from "../ui/SearchIcon";
import { NotificationIcon } from "../ui/NotificationIcon";
import type { User } from "@/types/user";
export default function Header({ user }: { user?: User | null }) {
  console.log("Header user data:", user);
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
          <svg
            className="w-4 h-4 text-gray-700 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M19 9l-7 7-7-7"
            />
          </svg>
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
              <svg
                className="w-4 h-4 text-gray-700 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
