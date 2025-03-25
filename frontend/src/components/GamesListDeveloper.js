import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function GamesListDeveloper({ games }) {
  const [hoveredGame, setHoveredGame] = useState(null);

  function handleHoveredGame(imageURL) {
    setHoveredGame(imageURL);
  }

  return (
    <div className="relative">
      <ul className="mt-4 space-y-2">
        {games.map((game) => (
          <NavLink
            key={game.id}
            to={`/games/${game.id}`}
            className="block p-2 rounded-md hover:bg-gray-800 transition duration-300"
            onMouseEnter={() => handleHoveredGame(game.imageURL)}
            onMouseLeave={() => setHoveredGame(null)}
          >
            <p className="text-gray-400">{game.title}</p>
          </NavLink>
        ))}
      </ul>

      {hoveredGame && (
        <div className="  mt-4 w-48 h-48 bg-gray-900 p-2 rounded-lg shadow-lg">
          <img
            src={hoveredGame}
            className="w-full h-full object-cover rounded-lg"
            alt="Game Preview"
          />
        </div>
      )}
    </div>
  );
}
