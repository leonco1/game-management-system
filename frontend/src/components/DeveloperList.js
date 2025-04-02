import Developer from './Developer.js';
import DeveloperNavigation from './DeveloperNavigation.js';


export default function DevelopersList({ developers }) {

  return (
    <div className="min-h-screen bg-gray-900 py-10 ">

      <div className="max-w-7xl mx-auto "> 
        <div className='flex items-center  border-b-2  border-b-red-900 justify-between'>
          <h1 className="text- 2xl font-bold text-center  text-white ">Developers</h1>
          <DeveloperNavigation/>
        </div>

        <div className="flex flex-wrap gap-4">
          {developers.map((developer) => (
            <div key={developer.id} className="p-4  w-1/5 m-4 flex flex-col justify-center bg-gray-800 rounded-lg shadow-lg   z-0 transition-transform transform hover:scale-105">
              <Developer key={developer.id} developer={developer} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}



      