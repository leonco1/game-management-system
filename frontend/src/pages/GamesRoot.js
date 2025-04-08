import GameNavigation from "../components/GameNavigation";
import { Outlet } from "react-router";
export default function GamesPageLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}
