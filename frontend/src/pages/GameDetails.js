import { createQueryPreloader, gql} from "@apollo/client"
import Game from "../components/Game"
import { useLoaderData } from "react-router";
import { useReadQuery } from "@apollo/client";
import { getApolloClient } from "../utils/apolloClient";

const GET_GAME_BY_ID_QUERY=gql`query getGameById($id:ID!)
{
    getGameById(id:$id)
    {
        title,
        imageURL,
        genres
        {
            id,
            name
        }
    }
}
`
const client=getApolloClient()
const preloadQuery=createQueryPreloader(client)
export default function GameDetailsPage()
{
    const queryRef = useLoaderData();
     const { data } = useReadQuery(queryRef);
    return <Game game={data.getGameById} isSingle={true}/>

}
export async function loader({params})
{

const id=params.gameId.substring(1)
 return  preloadQuery(GET_GAME_BY_ID_QUERY, {variables:{id}})
}

