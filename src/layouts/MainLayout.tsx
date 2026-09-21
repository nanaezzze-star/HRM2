import { Outlet } from "@tanstack/react-router";
import Header from "@/components/navigation/Header";
import Sidebar from "@/components/navigation/Sidebar";
import { useAuthUser } from "@/features/auth";
import { useState } from "react";

export default function MainLayout() {
  const { user } = useAuthUser();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      <Header
        user={user}
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div className="flex flex-1 h-full overflow-hidden">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
