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
    <div className="flex w-full h-screen ">
      <div className="relative w-1/2 bg-gradient-to-t from-red to-dark-red">
        <div className="flex flex-row items-center justify-center gap-6 pt-[20vh]">
          <div className=" w-30 h-30 rounded-full aspect-square border border-white p-6 flex items-center justify-center">
            <BrainIcon className="w-10 h-10 text-white opacity-70" />
          </div>
          <div className=" w-30 h-30 rounded-full aspect-square border border-white p-6 flex items-center justify-center">
            <BookIcon className="w-10 h-10 text-white opacity-70" />
          </div>
          <div className=" w-30 h-30 rounded-full aspect-square border border-white p-6 flex items-center justify-center">
            <ChartIcon className="w-10 h-10 text-white opacity-70" />
          </div>
          <div className=" w-30 h-30 rounded-full aspect-square border border-white p-6 flex items-center justify-center">
            <UsersIcon className="w-10 h-10 text-white opacity-70" />
          </div>
        </div>
        <DotsRight className="absolute top-0 right-0 pointer-events-none"></DotsRight>
        <div className="flex flex-col items-center gap-10">
          <p className="text-white font-bold text-3xl pt-10">Innowise LMS</p>
          <div className="text-white font-normal text-center items-center flex flex-col gap-4 text-lg">
            <p>Smart Learning, Smart Development</p>
            <div className="w-[10px] h-[10px] bg-white rounded-full" />
            <p>Unlock Knowledge, Embrace Success</p>
            <div className="w-[10px] h-[10px] bg-white rounded-full" />
            <p>
              Together We Learn, Together We <br />
              Grow
            </p>
            <div className="w-[10px] h-[10px] bg-white rounded-full" />
            <p>
              Growth of Skills, Growth of <br /> Opportunities
            </p>
          </div>
        </div>
        <DotsLeft className="absolute bottom-0 left-0 pointer-events-none"></DotsLeft>
      </div>
      <div className="w-1/2 h-full flex flex-col justify-center items-center relative">
        <Logo className="mb-4"></Logo>
        <p className="text-dark font-bold text-3xl">
          Innautomation <span className="text-gray-custom">Toolset</span>
        </p>
        <Button
          className="bg-white border-2 border-black/[54%] w-80 h-16 rounded-full text-gray-custom m-10 hover:bg-gray-custom/[20%]"
          onClick={() => handleLogin()}
          disabled={isPending}
        >
          <GoogleIcon className="flex-shrink-0" />
          {isPending ? "Connecting..." : "Continue with Google"}
        </Button>
        <div className="w-full absolute bottom-0 flex flex-col justify-center items-center">
          <p className="text-gray-custom font-normal mb-8">Version: 1.0.0</p>
          <div className=" w-full h-11 border-t shadow-[0_0_14px_rgba(0,0,0,0.06)] flex justify-center items-center cursor-pointer">
            <p className="text-gray-custom font-normal">Technical support</p>
          </div>
        </div>
      </div>
    </div>
  );
}
