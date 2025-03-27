import Game from "./Game";
// const DELETE_GAME_MUTATION = gql`
//   mutation deleteGame($id: ID!) {
//     deleteGame(id: $id) {
//       title
//     }
//   }
// `;

export default function GamesList({ games }) {

  return (
    <div className="min-h-screen bg-gray-900 py-10 ">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-white ">Games</h1>

        <div className="flex flex-wrap gap-4">
          {games.map((game) => (
            <div key={game.id} className="p-4 text-center">
              <Game key={game.id} game={game} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
