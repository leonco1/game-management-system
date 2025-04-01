import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_NEW_DEVELOPER_MUTATION } from "../utils/mutations";
import { GET_ALL_DEVELOPERS_QUERY } from "../utils/queries.js";

export default function DeveloperForm() {
  const [createDeveloper] = useMutation(CREATE_NEW_DEVELOPER_MUTATION, {
    onCompleted: () => navigate("/developers"),
    refetchQueries: [{ query: GET_ALL_DEVELOPERS_QUERY }],
  });
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [game, setGame] = useState({
    title: "",
    imageURL: "",
    description: "",
    genre: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    userEmail: "",
  });

  function cancelHandler() {
    navigate("..");
  }

  function handleGameChange(field, value) {
    setGame((prevGame) => ({
      ...prevGame,
      [field]: value,
    }));
  }

  function saveGameHandler() {
    setIsModalOpen(false);
  }
  function handleFormChange(field, value) {
    setFormData((prevForm) => ({
      ...prevForm,
      [field]: value,
    }));
  }
  function saveDeveloperHandler(e) {
    e.preventDefault();
    createDeveloper({
      variables: {
        name: formData.name,
        surname: formData.surname,
        userEmail: formData.userEmail,
        gameTitle: game.title,
        description: game.description,
        imageURL: game.imageURL,
        gameGenre: game.genre,
      },
    });
  }
  return (
    <div className="p-6 bg-gray-900 min-h-screen  shadow-lg ">
      <form className="max-w-lg mx-auto p-6 bg-gray-700 my-5 shadow-lg rounded-lg space-y-4">
        <p className="flex flex-col">
          <label htmlFor="name" className="font-semibold">
            Name
          </label>
          <input
            id="name"
            onChange={(e) => handleFormChange("name", e.target.value)}
            className="rounded-md"
            type="text"
            name="name"
            required
          />
        </p>
        <p className="flex flex-col">
          <label htmlFor="surname" className="font-semibold">
            Surname
          </label>
          <input
            id="surname"
            onChange={(e) => handleFormChange("surname", e.target.value)}
            className="rounded-md"
            type="text"
            name="surname"
            required
          />
        </p>
        <p className="flex flex-col">
          <label htmlFor="email" className="font-semibold">
            Email
          </label>
          <input
            id="email"
            onChange={(e) => handleFormChange("email", e.target.value)}
            className="rounded-md"
            type="email"
            name="email"
            required
          />
        </p>

        <input type="hidden" name="game" value={JSON.stringify(game)} />

        <p className="font-semibold">Game</p>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
        >
          Add Game
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg space-y-4">
              <p className="flex flex-col">
                <label className="font-semibold">Title</label>
                <input
                  type="text"
                  className="rounded-md"
                  value={game.title}
                  onChange={(e) => handleGameChange("title", e.target.value)}
                  required
                />
              </p>
              <p className="flex flex-col">
                <label className="font-semibold">Image URL</label>
                <input
                  type="url"
                  value={game.imageURL}
                  onChange={(e) => handleGameChange("imageURL", e.target.value)}
                  required
                />
              </p>
              <p className="flex flex-col">
                <label className="font-semibold">Description</label>
                <input
                  type="text"
                  value={game.description}
                  onChange={(e) =>
                    handleGameChange("description", e.target.value)
                  }
                  required
                />
              </p>
              <p className="flex flex-col">
                <label className="font-semibold">Genre</label>
                <input
                  type="text"
                  value={game.genre}
                  onChange={(e) => handleGameChange("genre", e.target.value)}
                  required
                />
              </p>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={saveGameHandler}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
                >
                  Save Game
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={cancelHandler}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 rounded"
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-gray-900 text-white hover:bg-gray-900 rounded"
            onSubmit={(e) => saveDeveloperHandler(e)}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
