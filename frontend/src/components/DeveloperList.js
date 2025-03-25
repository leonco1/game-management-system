import Developer from './Developer.js';



export default function DeveloperList({developers}) {
  return (
    <div className="min-h-screen bg-gray-900 py-10 mb-5">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Game Developers
        </h1>

        <div className='flex flex-wrap gap-4'>
            {developers.map((developer)=>(  
                <div key={developer.id}className='flex-1 max-w-xs  p-4 text-center'>
                <Developer key={developer.id} developer={developer}/>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}


      