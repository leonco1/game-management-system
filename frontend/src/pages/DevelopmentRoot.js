import { Outlet } from "react-router";

import Header from "../components/MainNavigation";

export default function DevelopmentRootPage ()
{
    return(
        <>
        <Header/>
        <main>
        <Outlet />
      </main>       
       </>
    )
}

