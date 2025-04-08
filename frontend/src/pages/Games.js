import { useQuery } from "@apollo/client";
import GamesList from "../components/GamesList";
import { GET_ALL_GAMES_QUERY } from "../utils/queries";
export default function GamesPage() {
  const { data, loading, fetchMore } = useQuery(GET_ALL_GAMES_QUERY, {
    variables: { limit: 8 },
  });
  if (loading) return <p>Loading</p>;

  return <GamesList games={data.getAllGames} fetchMore={fetchMore}></GamesList>;
}
