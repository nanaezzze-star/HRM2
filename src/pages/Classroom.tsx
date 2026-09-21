import { useAuthUser } from "@/features/auth";
import { Chat } from "@/features/classroom";

export default function Classroom() {
  const { user } = useAuthUser();

  return (
    <div className="min-h-screen bg-gray-button p-3 md:p-6">
      <main
        className="bg-white rounded-2xl border border-gray-bord 
      h-[calc(100vh-1.5rem)] md:h-[calc(100vh-3rem)] flex flex-col"
      >
        <div className="px-4 md:px-6 py-3 md:py-4 border-b border-gray-bord">
          <h1 className="text-lg md:text-xl font-bold text-dark">
            Virtual Classroom
          </h1>
          <p className="text-xs md:text-sm text-gray-custom">Live lesson</p>
        </div>

        <div className="flex-1 overflow-hidden">
          <Chat user={user} />
        </div>
      </main>
    </div>
  );
}
