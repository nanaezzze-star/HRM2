import { useState, useEffect } from "react";
import { authService } from "../services/authService";
import { userService } from "../services/userService";
import { type User as FirebaseUser } from "firebase/auth";
import { useQuery } from "@tanstack/react-query";

export const useAuthUser = () => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = authService.onAuthChange((user) => {
      setFirebaseUser(user); //take user obj
      setIsAuthLoading(false);
    });
    return () => unsubscribe(); //unmount listener
  }, []);

  const { data: userProfile, isLoading: isProfileLoading } = useQuery({
    queryKey: ["user", firebaseUser?.uid],
    queryFn: () =>
      firebaseUser ? userService.getUserById(firebaseUser.uid) : null, //take profile or null
    enabled: !!firebaseUser?.uid, //run only when UID exist
  });

  return {
    user: userProfile || null,
    isAuthLoading: isAuthLoading || isProfileLoading, //true while verifying auth or fetching profile
  };
};
