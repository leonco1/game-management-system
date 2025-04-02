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

  // <input type="hidden" name="game" value={JSON.stringify(game)} />

  return (
    <div className="p-6 bg-gray-900  min-h-screen  shadow-lg ">
      <form className="max-w-lg mx-auto p-6 bg-gray-500 opacity-85  my-5 shadow-lg rounded-lg space-y-4">
        <div className="h-1/3   p-6">
        <p className="flex flex-col">
          <label htmlFor="name" className="font-semibold pb-1">
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
        <p className="flex flex-col ">
          <label htmlFor="surname"  className="font-semibold pb-1">
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
          <label htmlFor="email" className="font-semibold pb-1">
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
        </div>
        <p className="flex flex-col">
      <label htmlFor="title" className="font-semibold pb-1">
        Game Title
      </label>
      <input
        id="title"
        onChange={(e) => handleGameChange("title", e.target.value)}
        className="rounded-md"
        type="text"
        name="title"
        value={game.title}
        required
      />
    </p>
    <p className="flex flex-col">
      <label htmlFor="imageURL" className="font-semibold pb-1">
        Image URL
      </label>
      <input
        id="imageURL"
        onChange={(e) => handleGameChange("imageURL", e.target.value)}
        className="rounded-md"
        type="url"
        name="imageURL"
        value={game.imageURL}
        required
      />
    </p>
    <p className="flex flex-col">
      <label htmlFor="description" className="font-semibold pb-1">
        Description
      </label>
      <input
        id="description"
        onChange={(e) => handleGameChange("description", e.target.value)}
        className="rounded-md"
        type="text"
        name="description"
        value={game.description}
        required
      />
    </p>
    <p className="flex flex-col">
      <label htmlFor="genre" className="font-semibold pb-1">
        Genre
      </label>
      <input
        id="genre"
        onChange={(e) => handleGameChange("genre", e.target.value)}
        className="rounded-md"
        type="text"
        name="genre"
        value={game.genre}
        required
      />
    </p>
              
              

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={cancelHandler}
            className="px-4 py-2  bg-gray-400 text-black hover:bg-gray-600 rounded"
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-black text-white hover:bg-gray-900 rounded"
            onSubmit={(e) => saveDeveloperHandler(e)}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}