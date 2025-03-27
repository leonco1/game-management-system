import { useRouteLoaderData } from "react-router";
import { useReadQuery } from "@apollo/client";
import GameForm from "../components/GameForm";
export default function EditGamePage()
{
    const queryRef = useRouteLoaderData("game-details");
    const { data } = useReadQuery(queryRef);

    return <GameForm game={data.getGameById}/>
}