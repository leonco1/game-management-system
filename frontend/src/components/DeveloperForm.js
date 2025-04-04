import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_NEW_DEVELOPER_MUTATION } from "../utils/mutations";
import {
  GET_ALL_DEVELOPERS_QUERY,
  GET_ALL_GENRES_QUERY,
} from "../utils/queries.js";
import Select from 'react-select'
export default function DeveloperForm() {
  const [createDeveloper] = useMutation(CREATE_NEW_DEVELOPER_MUTATION, {
    onCompleted: () => navigate("/developers"),
    refetchQueries: [{ query: GET_ALL_DEVELOPERS_QUERY }],
  });
  const navigate = useNavigate();

  const { data,loading} = useQuery(GET_ALL_GENRES_QUERY);
  const {data : developerData,loading:developerLoading}=useQuery(GET_ALL_DEVELOPERS_QUERY)
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    userEmail: "",
    title: "",
    imageURL: "",
    description: "",
    genre: "",
  });

  function cancelHandler() {
    navigate("..");
  }

  function handleFormChange(field, value) {
    setFormData((prevForm) => ({
      ...prevForm,
      [field]: value,
    }));
  }

  function saveDeveloperHandler(e) {
    e.preventDefault();
    console.log(formData)
    createDeveloper({
      variables: {
        name: formData.name,
        surname: formData.surname,
        userEmail: formData.userEmail,
        gameTitle: formData.title,
        description: formData.description,
        imageURL: formData.imageURL,
        gameGenre: formData.genre,
      },
    });
  }

  const handleSelectGenreChange = (selectedOption) => {
    if (!selectedOption) {
      handleFormChange("genre", ""); 
      return;
    }
    handleFormChange("genre", selectedOption.value);
  };
 
  const handleSelectDeveloperEmailChange = (selectedOption) => {
    if (!selectedOption) {
      handleFormChange("userEmail", ""); 
      return;
    }
    handleFormChange("userEmail", selectedOption.value);
  };
 
    const genreNames=data?.getAllGenres.map((genre)=>({value:genre.name,label:genre.name,}))||[]
    const developerEmails=developerData?.getAllDevelopers.map((developer)=>({value:developer.userEmail,label:developer.userEmail}))||[]
  return (
    <div className="p-6 bg-gray-900  bg- min-h-screen  shadow-lg ">
      <form className="max-w-lg mx-auto    bg-gray-700 opacity-85  my-5 shadow-lg rounded-lg ">
        <div className=" h-16 rounded-t-xl flex items-center pl-4 bg-gray-500">
          <span>
            <p className="text-white text-2xl">Add Developer</p>
          </span>
        </div>
        <p className="relative  font-semibold   top-4 left-5">
          Developer Details{" "}
        </p>

        <div className="h-1/4 flex flex-col gap-4 m-4 border border-gray-300  rounded-lg p-6">
          <div className="w-full flex gap-4">
            <div className="flex flex-col group-focus-within:scale-110 w-1/2">
              <label
                htmlFor="name"
                className="font-semibold text-white text-sm pb-1"
              >
                Name
              </label>
              <input
                id="name"
                onChange={(e) => handleFormChange("name", e.target.value)}
                className="rounded-md p-2 h-8  bg-gray-500 opacity-90 border"
                type="text"
                name="name"
                required
              />
            </div>

            <div className="flex flex-col  w-1/2">
              <label
                htmlFor="surname"
                className="font-semibold  text-sm text-white pb-1"
              >
                Surname
              </label>
              <input
                id="surname"
                onChange={(e) => handleFormChange("surname", e.target.value)}
                className="rounded-md p-2 border  h-8 bg-gray-500"
                type="text"
                name="surname"
                required
              />
            </div>
          </div>

          <div className="w-full flex flex-col">
            <label
              htmlFor="email"
              className="font-semibold text-white text-sm pb-1"
            >
              Email
            </label>
            <Select  
            isLoading={developerLoading}
              options={developerEmails}
              onChange={handleSelectDeveloperEmailChange}
              value={formData.userEmail ? { value: formData.userEmail, label: formData.userEmail } : null}
              className="  bg-gray-500  border text-black border-gray-300"
              isClearable
            />
          </div>
        </div>
        <p className="relative  font-semibold   top-4 left-5">Game Details </p>
        <div className="h-1/4 flex flex-col gap-4 m-4 border border-gray-300 rounded-lg p-6">
          <div className="w-full flex gap-4">
            <div className="flex flex-col w-1/2">
              <label
                htmlFor="title"
                className="font-semibold text-white text-sm pb-1"
              >
                Game Title
              </label>
              <input
                id="title"
                onChange={(e) => handleFormChange("title", e.target.value)}
                className="rounded-md p-2 h-8 bg-gray-500 opacity-90 border border-gray-300"
                type="text"
                name="title"
                value={formData.title}
                required
              />
            </div>

            <div className="flex flex-col w-1/2">
              <label
                htmlFor="imageURL"
                className="font-semibold text-white text-sm pb-1"
              >
                Image URL
              </label>
              <input
                id="imageURL"
                onChange={(e) => handleFormChange("imageURL", e.target.value)}
                className="rounded-md p-2 h-8 bg-gray-500 opacity-90 border border-gray-300"
                type="url"
                name="imageURL"
                value={formData.imageURL}
                required
              />
            </div>
          </div>

          <div className="w-full flex flex-col">
            <label
              htmlFor="genre"
              className="font-semibold text-white text-sm pb-1"
            >
              Genre
            </label>
            <Select  
            isLoading={loading}
              options={genreNames}
              onChange={handleSelectGenreChange}
              value={formData.genre ? { value: formData.genre, label: formData.genre } : null}
              className="  bg-gray-500  border text-black border-gray-300"
              isClearable
            />
          </div>
          <div className="w-full flex flex-col">
            <label
              htmlFor="description"
              className="font-semibold text-white text-sm pb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              onChange={(e) => handleFormChange("description", e.target.value)}
              className="rounded-md p-2 bg-gray-500 opacity-90 border border-gray-300 w-full h-10"
              name="description"
              value={formData.description}
              required
            />
          </div>
        </div>

        <div className="flex border-t p-3 mx-3 border-gray-100  justify-end space-x-4">
          <button
            type="button"
            onClick={cancelHandler}
            className="px-4 py-2  bg-gray-400 text-black hover:bg-gray-600 rounded"
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-black text-white hover:bg-gray-900 rounded"
            onClick={(e) => saveDeveloperHandler(e)}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
