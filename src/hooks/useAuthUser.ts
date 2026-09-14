import { useState, useEffect } from "react";
import { authService } from "@/lib/authService";
import { type User as FirebaseUser } from "firebase/auth";
import { useQuery } from "@tanstack/react-query";
import { userService } from "@/lib/userService";

export const useAuthUser = () => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = authService.onAuthChange((user) => {
      setFirebaseUser(user);
      setIsAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const { data: userProfile, isLoading: isProfileLoading } = useQuery({
    queryKey: ["user", firebaseUser?.uid],
    queryFn: () =>
      firebaseUser ? userService.getUserById(firebaseUser.uid) : null,
    enabled: !!firebaseUser?.uid,
  });

  return {
    user: userProfile || null,
    isAuthLoading: isAuthLoading || isProfileLoading,
  };
};
