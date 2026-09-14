import { Outlet } from "@tanstack/react-router";
import Header from "@/components/navigation/Header";
import Sidebar from "@/components/navigation/Sidebar";
import { useAuthUser } from "@/hooks/useAuthUser";

export default function MainLayout() {
  const {user} = useAuthUser()
return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      <Header user={user} />
      <div className="flex flex-1 h-full overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6 bg-[#F8F9FA]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}