import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/Home';
import NewDeveloperPage from './pages/NewDeveloper.js'
import DevelopmentRoot from './pages/DevelopmentRoot';
import DevelopersRootLayout from './pages/DevelopersRoot';
import DevelopersPage from './pages/Developers';
import GamesPageLayout from './pages/GamesRoot.js';
import GamesPage from './pages/Games.js';
import EditGamePage from './pages/EditGame.js';
import Login from './components/Login.js';
import GameForm from './components/GameForm.js';
import { Suspense } from 'react';
import Logout from './components/Logout.js';
import GameDetailsPage, {loader as gameDetailsLoader} from './pages/GameDetails.js';
import { AUTH_TOKEN } from './utils/constants.js';
import ProtectedRoute from './components/ProtectedRoute.js'

import { useState } from 'react';

import { useEffect } from 'react';


function App() {
  const [userToken, setUserToken] = useState(localStorage.getItem(AUTH_TOKEN));
useEffect(() => {
  setUserToken(localStorage.getItem(AUTH_TOKEN));
}, []);

const router = createBrowserRouter([
  {
    
    path: '/',
    element:
        <DevelopmentRoot />,
    children: [
      { index: true, element: <HomePage />},
    
      {
        path: 'developers',
        element: (
          <ProtectedRoute user={userToken}>  <DevelopersRootLayout /></ProtectedRoute>
          
        ),
        children: [
          { index: true, element: <DevelopersPage /> },
          { path: 'new', element: <NewDeveloperPage /> },
        ],
      },
      {
        path: 'games',
        
        element: <ProtectedRoute user={userToken}><GamesPageLayout /></ProtectedRoute>,
        children: [
          { index: true, element: <GamesPage /> },
          {
            path: ':gameId',
            id: 'game-details',
            loader: gameDetailsLoader,
            children: [
              {
                index: true,
                element: <GameDetailsPage />,
              },
              { path: 'edit', element: <EditGamePage /> },
            ],
          },
          { path: 'new', element: <GameForm /> },

        ],

      },
      { path: 'login', element: <Login setUserToken={setUserToken} /> },
      {path:'logout',element:<Logout setUserToken={setUserToken}/>}
    ],
  },
],);

 return (
 <Suspense fallback={"loading"}>
 <RouterProvider   router={router}/>
 </Suspense>
 )

}

export default App;
