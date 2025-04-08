import Developer from "./Developer.js";
import DeveloperNavigation from "./DeveloperNavigation.js";
import { useState } from "react";

export default function DevelopersList({ developers, fetchMore }) {
  const [loading, setLoading] = useState(false);

  const handleLoadMore = () => {
    setLoading(true);
    fetchMore({
      variables: {
        offset: developers.length,
        limit: 6,
      },
    }).then(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-gray-900  py-5">
      <div className="max-w-7xl mx-auto ">
        <div className="flex items-center  border-b-2  border-b-red-900  py-4  justify-between">
          <h1 className="text-3xl font-bold text-center  text-white ">
            Developers
          </h1>
          <DeveloperNavigation />
        </div>

        <div className="flex flex-wrap gap-x-16 gap-y-4">
          {developers.map((developer) => (
            <div
              key={developer.id}
              className="p-4  w-1/4 m-4   flex flex-col justify-center bg-gray-800 rounded-lg shadow-lg   z-0 transition-transform transform hover:scale-105"
            >
              <Developer key={developer.id} developer={developer} />
            </div>
          ))}
        </div>
        {/* "Load More" button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition"
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      </div>
    </div>
  );
}
