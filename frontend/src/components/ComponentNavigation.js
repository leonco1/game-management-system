import { NavLink } from "react-router-dom";

export default function ComponentNavigation({ navigateTo }) {
  const capitalisedNavigateTo =
    navigateTo.charAt(0).toUpperCase() + navigateTo.slice(1);

  return (
    <div
      className="bg-gray-900 
  "
    >
      <NavLink
        to={`/${navigateTo}/new`}
        className=" px-6 py-2 rounded-md no-underline  bg-gray-500 text-2xl text-gray-900"
      >
        New {capitalisedNavigateTo}
      </NavLink>
    </div>
  );
}
