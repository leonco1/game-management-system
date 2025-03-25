import { NavLink } from "react-router-dom";

export default function Game({ game, isSingle }) {
  return (
    <div
      className={`p-6 bg-gray-900 min-w-64  shadow-lg transition-transform ${
        isSingle
          ? "w-full h-screen flex flex-col items-center justify-center"
          : "max-h-fit transform hover:scale-105"
      }`}
    >
      {isSingle ? (
        <>
          <h1 className="text-xl font-bold text-center text-white">
            {game.title}
          </h1>
          <img
            src={game.imageURL}
            alt={game.title}
            className={`mt-4 rounded-lg w-full p-4 object-contain shadow-md ${
              isSingle ? "min-h-72" : "max-h-72"
            }`}
          />
          <h2 className="text-gray-400 text-xl text-center">
            {game.genres.map((genre) => (
              <span key={genre.id} className="mr-2">
                {genre.name}
              </span>
            ))}
          </h2>
          <div className="flex justify-center gap-4 mt-4">
            <NavLink
              to="edit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Edit
            </NavLink>
            <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
              Delete
            </button>
          </div>
        </>
      ) : (
        <NavLink to={`/games/:${game.id}`} className="block">
          <h1 className="text-xl font-bold text-center text-white">
            {game.title}
          </h1>
          <img
            src={game.imageURL}
            alt={game.title}
            className="mt-4 rounded-lg w-full p-4 object-contain shadow-md max-h-72"
          />
          <h2 className="text-gray-400 text-xl text-center">
            {game.genres.map((genre) => (
              <span key={genre.id} className="mr-2">
                {genre.name}
              </span>
            ))}
          </h2>
        </NavLink>
      )}
    </div>
  );
}
