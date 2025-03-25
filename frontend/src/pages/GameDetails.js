import { useApolloClient,gql, createQueryPreloader} from "@apollo/client"
import Game from "../components/Game"
import { useLoaderData } from "react-router";
import preloadQuery from "../index.js";
import { useReadQuery } from "@apollo/client";
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

export default function GameDetailsPage()
{
    const queryRef = useLoaderData();
  const { data } = useReadQuery(queryRef);
  console.log(data)
    return <Game game={data.getGameById} isSingle={true}/>
    
}
export async function loader({params})
{
const id=params.gameId.replace(":","")
return   preloadQuery(GET_GAME_BY_ID_QUERY, {variables:{id}})
}


