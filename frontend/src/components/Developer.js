import GamesListDeveloper from "./GamesListDeveloper";
export default function Developer({ developer }) {
  const games = developer.games;
  return (
    <>
      <h1 className="text-xl font-bold text-white">
        {developer.name} {developer.surname}
      </h1>
      <h2 className="text-gray-400 text-sm">{developer.userEmail}</h2>

      <h3 className="text-gray-300 mt-4 font-semibold">Games:</h3>
      {<GamesListDeveloper games={games} />}
      </>
  );
}
