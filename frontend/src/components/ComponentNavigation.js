import { NavLink } from "react-router-dom";

export default function ComponentNavigation({ navigateTo }) {
  const capitalisedNavigateTo =
    navigateTo.charAt(0).toUpperCase() + navigateTo.slice(1);
    
  return (
    <div className="bg-gray-900 p-8  
  ">
              <NavLink 
                to={`/${navigateTo}/new`}
                className={({ isActive }) =>
                  `px-6 py-2 rounded-md no-underline ${
                    isActive
                      ? "bg-red-800 text-black text-xl"
                      : "bg-gray-500 text-xl text-gray-900"
                  } hover:bg-primary-600`
                }
              >
                New {capitalisedNavigateTo}
              </NavLink>
    </div>
  );
}
