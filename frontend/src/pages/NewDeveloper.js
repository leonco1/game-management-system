import DeveloperForm from "../components/DeveloperForm";

export default function NewDeveloperPage() {
  return <DeveloperForm />;
}

// export async function action({ request }) {

//     const data = await request.formData();
//     const developerData = {
//       name: data.get("name"),
//       surname: data.get("surname"),
//       userEmail: data.get("email"),
//       gameTitle: JSON.parse(data.get("game")).title,
//       imageURL: JSON.parse(data.get("game")).imageURL,
//       description:JSON.parse(data.get("game")).description,
//       gameGenre: JSON.parse(data.get("game")).genre
//     };
//     return developerData

//   }
