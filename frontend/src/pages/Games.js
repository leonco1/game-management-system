import { useQuery,gql} from "@apollo/client"
import GamesList from "../components/GamesList"
const GET_ALL_GAMES_QUERY=gql`

query{
    getAllGames{
        id
        title
        imageURL
        genres{
            id
            name
        }
    }
}
`

export default function GamesPage()
{
const {data,loading}=useQuery(GET_ALL_GAMES_QUERY)
if(loading)return(<p>Loading</p>)
return <GamesList  games={data.getAllGames}>
</GamesList>
}