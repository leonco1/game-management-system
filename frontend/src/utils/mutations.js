import { gql } from "@apollo/client"

const CREATE_NEW_DEVELOPER_MUTATION=gql`
mutation createDeveloper($name: String!, $surname: String!, $userEmail: String!, $gameTitle: String!, $description:String!,$imageURL: String!, $gameGenre: String!) {
  createDeveloper(name: $name, surname: $surname, email: $userEmail, gameTitle: $gameTitle, description:$description, imageURL: $imageURL, gameGenre: $gameGenre) {
    name
    surname
    userEmail
    games {
      title
      description
      genres {
        name
      }
    }
  }
}
`



const DELETE_GAME_MUTATION=gql`mutation deleteGame($id:ID!)
{
  deleteGame(id:$id)
  {
    title
  }
}
`

const CREATE_GAME_MUTATION = gql`
  mutation createGame(
    $title: String!
    $developers: [String!]
    $description: String!
    $genreName: String!
    $imageURL: String!
  ) {
    createGame(
      title: $title
      developers: $developers
      genreName: $genreName
      description: $description
      imageURL: $imageURL
    ) {
      title
      developers {
        name
      }
      genres {
        name
      }
    }
  }
`

const UPDATE_GAME_MUTATION=gql`mutation updateGame($id:ID!,$developers:[String!],$description:String!,$imageURL:String!)
{
  updateGame(id:$id developers:$developers description: $description imageURL:$imageURL)
  {
    title

  }
}
`


export {CREATE_GAME_MUTATION,UPDATE_GAME_MUTATION,CREATE_NEW_DEVELOPER_MUTATION,DELETE_GAME_MUTATION}