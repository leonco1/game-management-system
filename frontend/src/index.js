import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './tailwind.css' 
 import {ApolloProvider,ApolloClient,createHttpLink,InMemoryCache, createQueryPreloader} from '@apollo/client'
import { AUTH_TOKEN } from './utils/constants';
import { setContext } from '@apollo/client/link/context';
import PreloadQuery from './PreloadQuery.js';

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
const client =new ApolloClient({
  
  link:authLink.concat(httpLink),
  cache: new InMemoryCache(),
  
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <ApolloProvider 
 client={client}
 >
  <PreloadQuery>
  <App/>
  </PreloadQuery>
 </ApolloProvider>
);


