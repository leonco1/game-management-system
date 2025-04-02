import { useState } from "react";
import { Form, useNavigate } from "react-router";
import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_GAME_MUTATION,
  UPDATE_GAME_MUTATION,
} from "../utils/mutations.js";
import {
  DEVELOPER_EMAIL_QUERY,
  GET_ALL_GAMES_QUERY,
} from "../utils/queries.js";

export default function GameForm({ game }) {
  const navigate = useNavigate();
  const genre = game?.genres.map((genre) => genre.name).join(" ") || [];
  const developersForGame =
    game?.developers.map((game) => game.userEmail) || [];
  const [developers, setDevelopers] = useState(developersForGame);
  const [selectedDeveloper, setSelectedDeveloper] = useState("");

  const [formState, setFormState] = useState({
    title: game?.title || "",
    description: game?.description || "",
    genreName: genre,
    imageURL: game?.imageURL || "",
  });
  const { data } = useQuery(DEVELOPER_EMAIL_QUERY);
  const developerEmails =
    data?.getAllDevelopers.map((dev) => dev.userEmail) || [];
  const [createGame] = useMutation(CREATE_GAME_MUTATION, {
    variables: {
      title: formState.title,
      developers: developers,
      genreName: formState.genreName,
      description: formState.description,
      imageURL: formState.imageURL,
    },
    onCompleted: () => navigate("/games"),
    refetchQueries: [{ query: GET_ALL_GAMES_QUERY }],
  });
  const [updateGame] = useMutation(UPDATE_GAME_MUTATION, {
    variables: {
      id: game ? game.id : 0,
      developers: developers,
      description: formState.description,
      imageURL: formState.imageURL,
    },
    onCompleted: () => navigate("/games"),
    refetchQueries: [{ query: GET_ALL_GAMES_QUERY }],
  });

  const handleAddDeveloper = () => {
    if (selectedDeveloper && !developers.includes(selectedDeveloper)) {
      setDevelopers((prev) => [...prev, selectedDeveloper]);
      setSelectedDeveloper("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    game ? updateGame() : createGame();
  };

  function cancelHandler() {
    navigate("..");
  }

  // useEffect(() => {
  //   if (game) {
  //     setFormState({
  //       title: game.title || "",
  //       genreName: game.genreName || "",
  //       imageURL: game.imageURL || "",
  //       description: game.description || "",
  //     });
  //   }
  // }, [game]);

  return (
    <div className="p-6 bg-gray-900 min-h-screen  shadow-lg ">
      <Form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto p-6 bg-gray-700 my-5 shadow-lg rounded-lg space-y-4"
      >
        <p className="flex flex-col">
          <label htmlFor="title" className="font-semibold">
            Title
          </label>
          <input
            id="title"
            className="rounded-md"
            type="text"
            value={formState.title}
            onChange={(e) =>
              setFormState({ ...formState, title: e.target.value })
            }
            disabled={game ? true : false}
            required
          />
        </p>

        <p className="flex flex-col">
          <label htmlFor="imageURL" className="font-semibold">
            Image URL
          </label>
          <input
            id="imageURL"
            className="rounded-md"
            type="text"
            value={formState.imageURL}
            onChange={(e) =>
              setFormState({ ...formState, imageURL: e.target.value })
            }
            required
          />
        </p>

        <p className="flex flex-col">
          <label htmlFor="description" className="font-semibold">
            Description
          </label>
          <input
            id="description"
            className="rounded-md"
            type="text"
            value={formState.description}
            onChange={(e) =>
              setFormState({ ...formState, description: e.target.value })
            }
            required
          />
        </p>

        <div className="flex flex-col">
          <label htmlFor="developerEmail" className="font-semibold">
            Developer Emails
          </label>
          <div className="flex items-center">
            <select
              id="developerEmail"
              className="rounded-md p-2"
              value={selectedDeveloper}
              onChange={(e) => setSelectedDeveloper(e.target.value)}
            >
              <option value="">Select a developer</option>
              {developerEmails.map((email, index) => (
                <option key={index} value={email}>
                  {email}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={handleAddDeveloper}
              className="ml-2 p-2 bg-blue-500 text-white rounded-md"
            >
              Add Developer
            </button>
          </div>
        </div>

        <ul className="mt-2">
          {developers.map((email, index) => (
            <li key={index} className="flex justify-between">
              {email}
              <button
                type="button"
                onClick={() =>
                  setDevelopers(developers.filter((e) => e !== email))
                }
                className="ml-2 text-red-500"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        <p className="flex flex-col">
          <label htmlFor="genreName" className="font-semibold">
            Genre
          </label>
          <input
            id="genreName"
            className="rounded-md"
            type="text"
            value={formState.genreName}
            disabled={game ? true : false}
            onChange={(e) =>
              setFormState({ ...formState, genreName: e.target.value })
            }
            required
          />
        </p>

        <div className="flex justify-end space-x-4">
        <button
            type="button"
            onClick={cancelHandler}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-gray-900 text-white hover:bg-gray-900 rounded"
          >
            {game ? "Edit Game" : "Create Game"}
          </button>
        </div>
      </Form>
    </div>
  );
}