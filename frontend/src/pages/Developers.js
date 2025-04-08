import { useQuery } from "@apollo/client";
import DeveloperList from "../components/DeveloperList";
import { GET_ALL_DEVELOPERS_QUERY } from "../utils/queries";

export default function DevelopersPage() {
  const { data, loading, fetchMore } = useQuery(GET_ALL_DEVELOPERS_QUERY, {
    variables: {
      limit: 6,
      offset: 0,
    },
  });
  if (loading) return <p>Loading</p>;

  return (
    <DeveloperList developers={data.getAllDevelopers} fetchMore={fetchMore} />
  );
}
