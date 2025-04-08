import { gql } from "@apollo/client"

const DEVELOPER_EMAIL_QUERY = gql`
  query {
    getAllDevelopers {
      userEmail
    }
  }
`


const GET_ALL_DEVELOPERS_QUERY=gql`
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


const GET_GAME_BY_ID_QUERY=gql`query getGameById($id:ID!)
{
    getGameById(id:$id)
    {
        id
        title,
        imageURL,
        description,
        developers
        {
            userEmail
        }
        genres
        {
            id,
            name
        }
    }
}
`

const GET_ALL_GAMES_QUERY=gql`

query($cursor:ID,$limit:Int){
  getAllGames(cursor: $cursor, limit: $limit){
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

const GET_ALL_GENRES_QUERY=gql`
query{
  getAllGenres{
    name
  }
}
`
export {DEVELOPER_EMAIL_QUERY,GET_ALL_GAMES_QUERY,GET_GAME_BY_ID_QUERY,GET_ALL_DEVELOPERS_QUERY,GET_ALL_GENRES_QUERY}