import GamesListDeveloper from "./GamesListDeveloper";
export default function Developer({ developer }) {
  const games = developer.games;
  return (
    <>
      <h1 className="text-xl font-bold text-white">
        {developer.name} {developer.surname}
      </h1>
      <h2 className="text-gray-400 text-sm  border-b-red-900 border-opacity-70 border-b">{developer.userEmail}</h2>

    <div className="text-gray-300 mt-4 font-semibold  pb-2  border-gray-900">
      <h3 >Games:</h3>
      </div>
      {<GamesListDeveloper games={games} />}
      </>
  );
}