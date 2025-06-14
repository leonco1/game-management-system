import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function GamesListDeveloper({ games }) {
  const [selectedGame, setSelectedGame] = useState(null);

  function handleGameClick(game) {
    setSelectedGame((prev) =>
      prev?.id === game.id ? null : { id: game.id, imageURL: game.imageURL }
    );
  }
  return (
    <div className="h-1/2 border-2 rounded-lg border-gray-900 overflow-scroll " >
      <ul className="mt-4 space-y-2">
        {games.map((game) => (
          <div
            key={game.id}
            className=" p-3 static rounded-md hover:bg-gray-800 transition duration-300 cursor-pointer"
            onClick={() => handleGameClick(game)}
          >
            
            <span className="text-gray-400">
            <p >{game.title}</p>
            </span>
           
          </div>
          
        ))}

      </ul>
      {selectedGame && (
        <div className=" absolute left-48 bottom-4 m-4  w-48 h-48 z-50 bg-gray-900 px-1 rounded-lg  shadow-lg">
          <NavLink to={`/games/:${selectedGame.id}`}>
            <img
              src={selectedGame.imageURL}
              className="w-full h-full object-cover rounded-lg"
              alt="Game Preview"
            />
          </NavLink>
        </div>
      )}
      
    </div>
  );
}