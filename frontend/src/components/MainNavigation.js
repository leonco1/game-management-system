import { NavLink } from "react-router";

export default function Header() {
  return (
    <div className="bg-black min-w-100% rounded-none text-gray-500 py-4  mx-auto  w-full flex justify-between items-center px-8 shadow-md">
    <header className="min-w-full" >
        <nav>
          <ul className="flex  min-w-full justify-between">
            <div className="flex space-x-6">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "visited:text-red-800 transition"
                    : "hover:text-red-800 transition"
                }
                end
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/developers"
                className={({ isActive }) =>
                  isActive
                    ? "visited:text-red-800 transition"
                    : "hover:text-red-800 transition"
                }
              >
                Developers
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/games"
                className={ ({ isActive }) =>
                  isActive
                    ? "visited:text-red-800 transition self-end"
                    : "hover:text-red-800 transition self-end"
                }
              >
                Games
              </NavLink>
            </li>
            </div>
            <li className="self-end" >
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "visited:text-red-800 transition "
                    : "hover:text-red-800 transition "
                }
              >
                Login
              </NavLink>
            </li>
          </ul>
        </nav>
    </header>
    </div>
  );
}
