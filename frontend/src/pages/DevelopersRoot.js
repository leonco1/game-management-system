import { Outlet } from "react-router";
import DeveloperNavigation from "../components/DeveloperNavigation";

export default function DevelopersRootLayout() {
  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
}
