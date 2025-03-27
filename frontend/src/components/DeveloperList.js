import Developer from './Developer.js';



export default function DevelopersList({ developers }) {

  return (
    <div className="min-h-screen bg-gray-900 py-10 ">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-5 text-white ">Developers</h1>

        <div className="flex flex-wrap gap-4">
          {developers.map((developer) => (
            <div key={developer.id} className="p-4  w-1/5 m-4 h-[300px]  bg-gray-800 rounded-lg shadow-lg   transition-transform transform hover:scale-105">
              <Developer key={developer.id} developer={developer} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}



      