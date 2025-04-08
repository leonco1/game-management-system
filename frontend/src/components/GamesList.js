import Game from "./Game";
import { useState } from "react";
import GameNavigation from "./GameNavigation";
export default function GamesList({ games, fetchMore }) {
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const loadMore = async () => {
    const lastGame = games[games.length - 1];
    console.log("Loading more after:", lastGame?.id);
    if (!lastGame) return;

    setIsLoadingMore(true);
    try {
      const { data } = await fetchMore({
        variables: {
          cursor: lastGame.id,
          limit: 6,
        },
      });
      console.log("Fetched more games:", data);
    } catch (err) {
      console.error("Fetch more error:", err);
    } finally {
      setIsLoadingMore(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-5 ">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center  border-b-2  border-b-red-900 py-4 justify-between">
          <h1 className="text-3xl font-bold text-center  text-white ">Games</h1>
          <GameNavigation />
        </div>

        <div className="flex flex-wrap gap-4 justify-evenly">
          {games.map((game) => (
            <div key={game.id} className="p-4 text-center">
              <Game game={game} />
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <button
            onClick={loadMore}
            disabled={isLoadingMore}
            className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800 transition"
          >
            {isLoadingMore ? "Loading..." : "Load More"}
          </button>
        </div>
      </div>
    </div>
  );
}
