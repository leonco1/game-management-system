import { NavLink, useNavigate } from "react-router";
import { AUTH_TOKEN } from "../utils/constants.js";
import Logout from "./Logout.js";
import Login from "./Login.js";
import { useState } from "react";
export default function Header() {
  const isToken = localStorage.getItem(AUTH_TOKEN) || null;
  const navigate = useNavigate();

  return (
    <div className="bg-black min-w-100% rounded-none text-gray-500 py-4  mx-auto  w-full flex justify-between items-center px-8 shadow-md">
      <header className="min-w-full">
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
              <li hidden={isToken ? false : true}>
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
              <li hidden={isToken ? false : true}>
                <NavLink
                  to="/games"
                  className={({ isActive }) =>
                    isActive
                      ? "visited:text-red-800 transition self-end"
                      : "hover:text-red-800 transition self-end"
                  }
                >
                  Games
                </NavLink>
              </li>
            </div>
            <li className="self-end">
              <NavLink
                to={isToken ? "/logout" : "/login"}
                className={({ isActive }) =>
                  isActive
                    ? "visited:text-red-800 transition "
                    : "hover:text-red-800 transition "
                }
              >
                {isToken ? "Logout" : "Login"}
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
