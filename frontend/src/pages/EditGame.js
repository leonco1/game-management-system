import { useRouteLoaderData } from "react-router";
import Game from "../components/Game";
export default function EditGamePage()
{
    const data=useRouteLoaderData("game-details")
    console.log("this is edit "+ data)
    return <Game game={data.getGameById}/>
}