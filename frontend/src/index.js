import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './tailwind.css' 
import reportWebVitals from './reportWebVitals';
 import {ApolloProvider,ApolloClient,createHttpLink,InMemoryCache, createQueryPreloader} from '@apollo/client'
import { AUTH_TOKEN } from './utils/constants';
import { setContext } from '@apollo/client/link/context';

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
const preloadQuery=createQueryPreloader(client)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <ApolloProvider 
 client={client}
 >
  <App/>
 </ApolloProvider>
);

export default preloadQuery

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
