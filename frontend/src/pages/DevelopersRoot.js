import { Outlet } from "react-router";
import DeveloperNavigation from "../components/DeveloperNavigation";

export default function DevelopersRootLayout() {
  return (
    <>
      <DeveloperNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}
