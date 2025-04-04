import Game from "./Game";
// const DELETE_GAME_MUTATION = gql`
//   mutation deleteGame($id: ID!) {
//     deleteGame(id: $id) {
//       title
//     }
//   }
// `;
import GameNavigation from "./GameNavigation";
export default function GamesList({ games }) {

  return (
    <div className="min-h-screen bg-gray-900 py-5 ">
      <div className="max-w-7xl mx-auto px-6">
        <div className='flex items-center  border-b-2  border-b-red-900 py-5 m-3 justify-between'>
                  <h1 className="text-3xl font-bold text-center  text-white ">Games</h1>
                  <GameNavigation/>
                </div>

        <div className="flex flex-wrap gap-4 justify-between">
          {games.map((game) => (
            <div key={game.id} className="p-5 text-center">
              <Game key={game.id} game={game} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}