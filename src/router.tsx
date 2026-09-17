import {
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import Auth from "./layouts/AuthLayout";
import Root from "./layouts/RootLayout";
import MainLayout from "./layouts/MainLayout";
import Progress from "./pages/Progress";
import Courses from "./pages/Courses";
import Login from "./pages/LoginPage";

const getUser = () => {
  return new Promise((resolve) => {
    //resolved user or null
    const auth = getAuth();

    if (auth.currentUser) {
      resolve(auth.currentUser);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      //waiting for auth state change
      unsubscribe(); //only first event
      resolve(user);
    });
  });
};

const rootRoute = createRootRoute({
  component: Root,
});
const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "auth",
  component: Auth,

  beforeLoad: async () => {
    //if user is already logged in
    const user = await getUser();
    if (user) {
      throw redirect({ to: "/courses" });
    }
  },
});

const loginRoute = createRoute({
  getParentRoute: () => authRoute,
  path: "login",
  component: Login,
});

const mainRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "main-layout",
  component: MainLayout,
  beforeLoad: async () => {
    const user = await getUser();
    if (!user) {
      throw redirect({ to: "/auth/login" });
    }
  },
});

const courseProgresRoute = createRoute({
  getParentRoute: () => mainRoute,
  path: "progress",
  component: Progress,
});

const courseRoute = createRoute({
  getParentRoute: () => mainRoute,
  path: "courses",
  component: Courses,
});
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: () => {
    throw redirect({ to: "/auth/login" });
  },
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  authRoute.addChildren([loginRoute]),
  mainRoute.addChildren([courseRoute, courseProgresRoute]),
]);

export const router = createRouter({ routeTree });
