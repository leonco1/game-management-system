import { Outlet } from "react-router-dom";
import Header from "../components/MainNavigation";

export default function MainLayout() {
  return (
    <div className="flex h-full">
      <div className="w-1/6 h-full bg-gray-900 "></div>
      <div className="flex-grow  w-full "></div>
      <div className=" w-1/6 h-full bg-gray-900 "></div>
    </div>
  );
}
