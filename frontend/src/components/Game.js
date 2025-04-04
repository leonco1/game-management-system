import { useMutation } from "@apollo/client";
import { NavLink, useNavigate } from "react-router-dom";
import { DELETE_GAME_MUTATION } from "../utils/mutations";
import { getApolloClient } from "../utils/apolloClient";
import { GET_ALL_GAMES_QUERY } from "../utils/queries";

export default function Game({ game, isSingle }) {
  const client = getApolloClient();

  const navigate = useNavigate();

  const [deleteGame] = useMutation(DELETE_GAME_MUTATION, {
    variables: { id: game.id },
    onCompleted: () => navigate("/games"),
    refetchQueries: [{ query: GET_ALL_GAMES_QUERY }],
  });

  function startDeleteHandler() {
    const proceed = window.confirm("Are you sure");

    if (proceed) {
      deleteGame();
    }
  }
  return (
    <div
      className={` bg-gray-900 min-w-52   shadow-lg transition-transform ${
        isSingle
          ? "w-full h-screen flex flex-col items-center justify-center"
          : "max-h-full max-w-60 transform hover:scale-105"
      }`}
    >
      {isSingle ? (
        <>
          <h1 className="text-xl font-bold text-center text-white">
            {game.title}
          </h1>
          <img
            src={game.imageURL}
            alt={game.title}
            className={`mt-4 rounded-lg w-full p-4 object-contain shadow-md ${
              isSingle ? "min-h-72" : "max-h-80"
            }`}
          />
          <h2 className="text-gray-400 text-xl text-center">
            {game.genres.map((genre) => (
              <span key={genre.id} className="mr-2">
                {genre.name}
              </span>
            ))}
          </h2>
            <p className="text-gray-400 text-xl text-center">{game.description}</p>

          <div className="flex justify-center gap-4 mt-4">
            <NavLink
              to="edit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg "
            >
              Edit
            </NavLink>
            <button
              onClick={startDeleteHandler}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </>
      ) : (
        <NavLink
          to={`/games/:${game.id}`}
          className=" flex flex-col justify-center"
        >
          <h1 className="text-lgs font-bold text-center text-white pb-1">
            {game.title}
          </h1>
          <img
            src={game.imageURL}
            alt={game.title}
            className="mt-4  rounded-lg  outline-double  w-full h-60"
          />
          <h2 className="text-gray-400 text-xl pt-2 ">
            {game.genres.map((genre) => (
              <span key={genre.id}>{genre.name}</span>
            ))}
          </h2>
        </NavLink>
      )}
    </div>
  );
}