import { Outlet } from "@tanstack/react-router";

export default function Root() {
  return (
    <div>
      Root
      <Outlet />
    </div>
  );
}