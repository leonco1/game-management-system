import { NavLink } from "react-router";

export default function Header() {
    return (
      <header className="bg-black text-gray-500 py-4 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-8">
            <nav>
            <ul className="flex  space-x-6">
              <li>
              <NavLink to="/" className={({ isActive }) => isActive ? "visited:text-red-800 transition"   : "hover:text-red-800 transition"}  end>Home</NavLink>
              </li>
              <li>
              <NavLink to="/developers" className={({ isActive }) => isActive ? "visited:text-red-800 transition"  :  "hover:text-red-800 transition"}  >Developers</NavLink>
              </li>
              <li>
              <NavLink to="/games" className={({ isActive }) => isActive ? "visited:text-red-800 transition"  :  "hover:text-red-800 transition"}  >Games</NavLink>
              </li>
              <li>
              <NavLink to="/genres" className={({ isActive }) => isActive ? "visited:text-red-800 transition"  :  "hover:text-red-800 transition"}  >Genres</NavLink>
              </li>
              <li>
              <NavLink to="/login" className={({ isActive }) => isActive ? "visited:text-red-800 transition"  :  "hover:text-red-800 transition"}  >Login</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
  