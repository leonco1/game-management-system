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
import GameDetailsPage, {loader as gameDetailsLoader} from './pages/GameDetails.js';
import DeleteGamePage from './pages/DeleteGame.js';



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
          {
            path: ':gameId',
            id:"game-details",
            element: <GameDetailsPage/>,
            loader: gameDetailsLoader,
            children: [
            {
              index:true,element:<DeleteGamePage/>
            },
            {path: 'edit', element: <EditGamePage /> },
            ],
          },
          { path: 'new', element: <GameForm /> },

        ],

      },
      { path: 'login', element: <Login /> },
    ],
  },
]);

function App() {
 return (
 <Suspense fallback={"loading"}>
 <RouterProvider   router={router}/>
 
 </Suspense>)

}

export default App;
