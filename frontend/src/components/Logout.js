import { useApolloClient } from "@apollo/client";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Logout({setUserToken})
{
    const client=useApolloClient()
    const navigate=useNavigate()
    
    useEffect(()=>{
        client.resetStore().then(()=>{
            localStorage.clear()
            setUserToken(null)
            navigate('/',{replace:true})
        })
    },[client,navigate,setUserToken])
}