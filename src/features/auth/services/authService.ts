import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  type User as FirebaseUser,
} from "firebase/auth";
import { auth } from "@/shared/lib/firebase";
import { userService } from "./userService";
import type { User } from "../types";

const googleProvider = new GoogleAuthProvider();

export const authService = {
  loginWithGoogle: async (): Promise<User | null> => {
    try {
      const result = await signInWithPopup(auth, googleProvider); //authentifcation via google
      const fbUser = result.user;

      let existingUser = await userService.getUserById(fbUser.uid);

      if (!existingUser) {
        //if is the first login - create new user
        const newUser: User = {
          id: fbUser.uid,
          firstName: fbUser.displayName?.split(" ")[0] || "User",
          lastName: fbUser.displayName?.split(" ").slice(1).join(" ") || "",
          email: fbUser.email || "",
          role: "employee",
          position: "Employee",
          avatarUrl: fbUser.photoURL || undefined,
        };

        await userService.setUserWithId(fbUser.uid, newUser);
        return newUser;
      }

      return existingUser;
    } catch (error) {
      console.error("Something wrong:", error);
      throw error;
    }
  },

  logout: async (): Promise<void> => {
    await signOut(auth);
  },

  onAuthChange: (callback: (user: FirebaseUser | null) => void) => {
    // auth state listener (returns cleanup function)
    return onAuthStateChanged(auth, callback);
  },
};
