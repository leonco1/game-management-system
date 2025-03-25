import { useQuery,gql } from "@apollo/client";
import DeveloperList from "../components/DeveloperList";

const DEVELOPER_QUERY=gql`
query getAllDevelopers
{
  getAllDevelopers
  {
    id
    name
    surname
    userEmail
    games{
      id
      title
      imageURL
      genres{
        id
        name
      }

    }
    
  }
}
`

export default function DevelopersPage()
{
    const {data,loading}= useQuery(DEVELOPER_QUERY)
    if(loading)return <p>Loading</p>
    return <DeveloperList developers={data.getAllDevelopers}/>

}

