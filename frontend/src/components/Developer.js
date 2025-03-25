
import GamesListDeveloper from "./GamesListDeveloper";
export default function Developer({ developer }) {
  const games=developer.games
  console.log(games)
  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105">
      <h1 className="text-xl font-bold text-white">{developer.name} {developer.surname}</h1>
      <h2 className="text-gray-400 text-sm">{developer.userEmail}</h2>

      <h3 className="text-gray-300 mt-4 font-semibold">Games:</h3>
      {<GamesListDeveloper games={games}/>}
    </div>
  );
}
