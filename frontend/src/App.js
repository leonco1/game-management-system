import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/Home';
import DeveloperList from './components/DeveloperList';
import NewDeveloperPage ,{action as newDeveloperAction}from './pages/NewDeveloper.js'
import DevelopmentRoot from './pages/DevelopmentRoot';
import DevelopersRootLayout from './pages/DevelopersRoot';
import DevelopersPage from './pages/Developers';
import GamesPageLayout from './pages/GamesRoot.js';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import GamesPage from './pages/Games.js';
import client from './utils/apolloClient.js';
import EditGamePage from './pages/EditGame.js';
import Login from './components/Login.js';
import GameForm from './components/GameForm.js';
import GameDetailsPage, {loader as gameDetailsLoader} from './pages/GameDetails.js';
import { Suspense } from 'react';
const router = createBrowserRouter([
  {
    path: '/',
    element: <DevelopmentRoot />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'developers',
        element: (
            <DevelopersRootLayout />
        ),
        children: [
          { index: true, element: <DevelopersPage /> },
          { path: 'new', element: <NewDeveloperPage /> },
        ],
      },
      {
        path: 'games',
        element: <GamesPageLayout />,
        children: [
          { index: true, element: <GamesPage /> },
          { path: 'new', element: <GameForm /> },
          {
            path: ':gameId',
            id:"game-details",
            element: (<Suspense fallback={"Loading"}>
              <GameDetailsPage/>
            </Suspense>),
            loader: gameDetailsLoader,
            children: [
              { path: 'edit', element: <EditGamePage /> },
            ],
          },
        ],
      },
      { path: 'login', element: <Login /> },
    ],
  },
]);

function App() {
 return <RouterProvider router={router}/>

}

export default App;
 