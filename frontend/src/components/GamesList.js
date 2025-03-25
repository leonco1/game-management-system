import Game from "./Game";

export default function GamesList({games})
{

    return (
        <div className="min-h-screen bg-gray-900 py-10 mb-5">
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-4xl font-bold text-center text-white mb-8">
              Games
            </h1>
    
            <div className='flex flex-wrap gap-4'>
                {games.map((game)=>(  
                    <div key={game.id}className='flex-1 max-w-xs  p-4 text-center'>
                    <Game key={game.id} game={game}/>
                    </div>
                ))}
            </div>
          </div>
        </div>
      );
}