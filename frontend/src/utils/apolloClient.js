import {ApolloClient,createHttpLink,InMemoryCache} from '@apollo/client'
import { AUTH_TOKEN } from './constants.js';
import { setContext } from '@apollo/client/link/context';
let apolloClient;
export const getApolloClient = () => {
  if (apolloClient) {
    return apolloClient;
  }
  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getAllGames: {
            keyArgs: false, // tells Apollo to treat all getAllGames results as part of the same list
            merge(existing = [], incoming, { readField }) {
              const existingIds = new Set(existing.map((item) => readField("id", item)));
              const merged = [...existing];
  
              for (const item of incoming) {
                const id = readField("id", item);
                if (!existingIds.has(id)) {
                  merged.push(item);
                }
              }
  
              return merged;
            }
          }
        }
      }
    }
  });
  
  const httpLink= createHttpLink({
    uri:'http://localhost:4000'
  })
  
  const authLink=setContext((_,{headers})=>{
    const token=localStorage.getItem(AUTH_TOKEN)
    return{
        headers:{
          ...headers,
          authorization:token? `Bearer ${token}`:''
        }
    }
  })
   apolloClient =new ApolloClient({
    
    link:authLink.concat(httpLink),
    cache
    
  })
  return apolloClient;
  
  };


  function offsetFromCursor(items, cursor, readField) {
    // Search from the back of the list because the cursor we're
    // looking for is typically the ID of the last item.
    for (let i = items.length - 1; i >= 0; --i) {
      const item = items[i];
      // Using readField works for both non-normalized objects
      // (returning item.id) and normalized references (returning
      // the id field from the referenced entity object), so it's
      // a good idea to use readField when you're not sure what
      // kind of elements you're dealing with.
      if (readField("id", item) === cursor) {
        // Add one because the cursor identifies the item just
        // before the first item in the page we care about.
        return i + 1;
      }
    }
    // Report that the cursor could not be found.
    return -1;
  }
  