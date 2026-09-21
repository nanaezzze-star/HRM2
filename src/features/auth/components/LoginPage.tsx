import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { authService } from "../services/authService";
import { BookIcon } from "@/components/ui/BookIcon";
import { BrainIcon } from "@/components/ui/BrainIcon";
import { ChartIcon } from "@/components/ui/ChartIcon";
import { DotsLeft } from "@/components/ui/DotsLeft";
import { DotsRight } from "@/components/ui/DotsRight";
import { UsersIcon } from "@/components/ui/UsersIcon";
import { Button } from "@/components/ui/Button";
import { GoogleIcon } from "@/components/ui/GoogleIcon";
import { Logo } from "@/components/ui/Logo";

export default function Login() {
  const navigate = useNavigate();

  const { mutate: handleLogin, isPending } = useMutation({
    mutationFn: () => authService.loginWithGoogle(),
    onSuccess: (user) => {
      if (user) {
        navigate({ to: "/courses" });
      }
    },
    onError: (error) => {
      console.error("Auth error", error);
    },
  });
  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      <div
        className="relative w-full md:w-1/2 bg-gradient-to-t
       from-red to-dark-red min-h-[40vh] md:min-h-screen"
      >
        <div
          className="flex flex-row items-center justify-center 
        gap-3 md:gap-6 pt-10 md:pt-[20vh] px-4"
        >
          <div
            className="
          w-16 h-16 md:w-30 md:h-30 rounded-full aspect-square border
           border-white p-3 md:p-6 flex items-center justify-center"
          >
            <BrainIcon className="w-6 h-6 md:w-10 md:h-10 text-white opacity-70" />
          </div>
          <div
            className="w-16 h-16 md:w-30 md:h-30 rounded-full aspect-square border border-white 
          p-3 md:p-6 flex items-center justify-center"
          >
            <BookIcon className="w-6 h-6 md:w-10 md:h-10 text-white opacity-70" />
          </div>
          <div className="w-16 h-16 md:w-30 md:h-30 rounded-full aspect-square border border-white 
          p-3 md:p-6 flex items-center justify-center">
            <ChartIcon className="w-6 h-6 md:w-10 md:h-10 text-white opacity-70" />
          </div>
          <div className="w-16 h-16 md:w-30 md:h-30 rounded-full aspect-square border border-white 
          p-3 md:p-6 flex items-center justify-center">
            <UsersIcon className="w-6 h-6 md:w-10 md:h-10 text-white opacity-70" />
          </div>
        </div>
        <DotsRight className="absolute top-0 right-0 pointer-events-none hidden md:block" />
        <div className="flex flex-col items-center gap-4 md:gap-10 px-4">
          <p className="text-white font-bold text-xl md:text-3xl pt-6 md:pt-10">
            Innowise LMS
          </p>
          <div className="text-white font-normal text-center items-center flex flex-col gap-2 md:gap-4 text-sm md:text-lg">
            <p>Smart Learning, Smart Development</p>
            <div className="w-[8px] h-[8px] md:w-[10px] md:h-[10px] bg-white rounded-full" />
            <p>Unlock Knowledge, Embrace Success</p>
            <div className="w-[8px] h-[8px] md:w-[10px] md:h-[10px] bg-white rounded-full" />
            <p className="md:block">
              Together We Learn, Together We <br className="hidden md:inline" />
              Grow
            </p>
            <div className="w-[8px] h-[8px] md:w-[10px] md:h-[10px] bg-white rounded-full" />
            <p className="md:block">
              Growth of Skills, Growth of <br className="hidden md:inline" />{" "}
              Opportunities
            </p>
          </div>
        </div>
        <DotsLeft className="absolute bottom-0 left-0 pointer-events-none hidden md:block" />
      </div>

      <div className="w-full md:w-1/2 min-h-[60vh] md:h-full flex flex-col 
      justify-center items-center relative px-4 py-8 md:py-0">
        <Logo className="mb-3 md:mb-4 w-16 md:w-auto" />
        <p className="text-dark font-bold text-xl md:text-3xl text-center">
          Innautomation <span className="text-gray-custom">Toolset</span>
        </p>
        <Button
          className="bg-white border-2 border-black/[54%] w-full md:w-80 h-14 md:h-16 
          rounded-full text-gray-custom mt-6 md:m-10 hover:bg-gray-custom/[20%]"
          onClick={() => handleLogin()}
          disabled={isPending}
        >
          <GoogleIcon className="flex-shrink-0" />
          {isPending ? "Connecting..." : "Continue with Google"}
        </Button>
        <div className="w-full md:absolute md:bottom-0 flex flex-col justify-center items-center mt-8 md:mt-0">
          <p className="text-gray-custom font-normal mb-4 md:mb-8 text-sm">
            Version: 1.0.0
          </p>
          <div className="w-full h-11 border-t shadow-[0_0_14px_rgba(0,0,0,0.06)] flex justify-center items-center cursor-pointer">
            <p className="text-gray-custom font-normal text-sm">
              Technical support
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
