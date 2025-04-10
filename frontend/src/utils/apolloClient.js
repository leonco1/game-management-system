import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { AUTH_TOKEN } from "./constants.js";
import { setContext } from "@apollo/client/link/context";
let apolloClient;

export const getApolloClient = () => {
  if (apolloClient) {
    return apolloClient;
  }

  const httpLink = createHttpLink({
    uri: "https://1ng0leg91k.execute-api.us-east-1.amazonaws.com/",
  });

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(AUTH_TOKEN);
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });
  apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
  return apolloClient;
};
