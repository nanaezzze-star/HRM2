import {
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";

import Auth from "./layouts/AuthLayout";
import Root from "./layouts/RootLayout";
import MainLayout from "./layouts/MainLayout";
import Progres from "./pages/Progress";
import Courses from "./pages/Courses";
import Login from "./pages/LoginPage";
import Progress from "./pages/Progress";

const rootRoute = createRootRoute({
  component: Root,
});
const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "auth",
  component: Auth,
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
  courseRoute,
  courseProgresRoute,
  authRoute.addChildren([loginRoute]),
  mainRoute.addChildren([courseRoute, courseProgresRoute]),
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
