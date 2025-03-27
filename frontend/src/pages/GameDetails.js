import { createQueryPreloader } from "@apollo/client";
import Game from "../components/Game";
import { useRouteLoaderData } from "react-router";
import { useReadQuery } from "@apollo/client";
import { getApolloClient } from "../utils/apolloClient";
import { GET_GAME_BY_ID_QUERY } from "../utils/queries";

const client = getApolloClient();
const preloadQuery = createQueryPreloader(client);

export default function GameDetailsPage() {
  const queryRef = useRouteLoaderData("game-details");
  const { data } = useReadQuery(queryRef);
  return <Game game={data.getGameById} isSingle={true} />;
}
export async function loader({ params }) {
  const id = params.gameId.substring(1);
  return preloadQuery(GET_GAME_BY_ID_QUERY, { variables: { id } });
}
