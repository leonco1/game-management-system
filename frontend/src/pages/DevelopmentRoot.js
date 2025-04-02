import { Outlet } from "react-router";

import Header from "../components/MainNavigation";
import MainLayout from "../components/MainLayout";

export default function DevelopmentRootPage() {
  return (
    <>
    <Header/>
   <MainLayout/>
    <Outlet/>
    </>
  );
}