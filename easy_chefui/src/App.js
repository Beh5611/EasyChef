import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
} from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import { ErrorPage } from "./Pages/Error/Errors";
import Login from "./components/Auth/Login";
import Logout from "./components/Auth/Logout";
import Register from "./components/Auth/Register";
import UserProfile from "./components/Auth/UserProfile";
import RecipeForm from "./components/RecipeForm"
// import EditRecipe from "./components/EditRecipe/EditRecipe";
import axios from "axios";
import { useContext } from "react";

import AuthContext from "./components/Auth/AuthContext";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import CardWrapper from "./components/CardList/CardWrapper";
import Post from "./components/Post/Post";

import LoggedIn from "./components/Navbar/LoggedIn.jsx";
import LoggedOut from "./components/Navbar/LoggedOut.jsx";
import RecipeDetails from "./components/RecipeDetails";
// import RecipeForm from "./components/RecipeForm";

function App() {
  const { user, logoutUser, authRedirect, unauthRedirect } =
    useContext(AuthContext);

  let navbar = null;
  if (user) {
    navbar = <LoggedIn></LoggedIn>;
  } else {
    navbar = <LoggedOut></LoggedOut>;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/login",
      element: <Login />,
      loader: () => {
        const auth = authRedirect();
        if (auth) {
          return auth;
        }
        return null;
      },
      errorElement: <ErrorPage />,
    },
    {
      path: "/logout",
      element: <Logout />,
      loader: async () => {
        if (user) {
          const r = await logoutUser();
        }
        return null;
      },
      errorElement: <ErrorPage />,
    },
    {
      path: "/register",
      element: <Register />,
      loader: () => {
        return authRedirect();
      },
      errorElement: <ErrorPage />,
    },
    {
      path: "/profile",
      element: <UserProfile />,
      loader: async () => {
        console.log("user here", user);
        const unauth = unauthRedirect();
        if (unauth) {
          return unauth;
        }
        const response = await axios.get(
          `${process.env.REACT_APP_PRODUCTION_BACKEND_URL || "https://anologia.pythonanywhere.com"}/accounts/${user.id}/user/`,
          { withCredentials: true }
        );
        return response.data;
      },
      errorElement: <ErrorPage message="user not logged in." />,
    },
    {
      path: "/shopping-cart",
      element: <ShoppingCart />,
      loader: async () => {
        return unauthRedirect();
      },
      errorElement: <ErrorPage message="user not logged in." />,
    },
    {
      path: "/posts/search/:sort?",
      loader: async ({ request, params }) => {
        const url = new URL(request.url);
        const querystring = url.searchParams;
        const sort = params.sort ?? "filter"; // Use "filter" as default if params.sort is undefined
        const response = await axios.get(
          `${process.env.REACT_APP_PRODUCTION_BACKEND_URL || "https://anologia.pythonanywhere.com"}/posts/search/${sort}/?${querystring}`
        );
        console.log(response.data.results)
        return response.data.results;
      },
      element: <CardWrapper title="Search" />,
      errorElement: <ErrorPage message="user not logged in." />,
    },
    {
      path: "/profile/myrecipes",
      loader: async ({ request, params }) => {
        const url = new URL(request.url);
        const querystring = url.searchParams;
        const response = await axios.get(
          `${process.env.REACT_APP_PRODUCTION_BACKEND_URL || "https://anologia.pythonanywhere.com"}/posts/search/${params.sort}/?owner=${user.username}`
        );
        return response.data.results;
      },
      element: <CardWrapper title="My Recipes" />,
      errorElement: <ErrorPage message="user not logged in." />,
    },
    {
      path: "/posts/:postid",
      loader: async ({ params }) => {
        const response = await axios.get(
          `${process.env.REACT_APP_PRODUCTION_BACKEND_URL || "https://anologia.pythonanywhere.com"}/posts/${params.postid}/`
        );
        return response.data;
      },
      element: <RecipeDetails/>,
      errorElement: <ErrorPage message="user not logged in." />,
    },
    {
      path: "/create",
      element: <RecipeForm/>,
      loader: async () => {
        return unauthRedirect();
      },
      errorElement: <ErrorPage message="user not logged in." />,
    }, 
    {
      path: "/posts/:postid/edit",
      loader: async ({params}) => {
        // console.log("user here", user);
        const unauth = unauthRedirect();
        if (unauth) {
          return unauth;
        }
        const response = await axios.get(
          `${process.env.REACT_APP_PRODUCTION_BACKEND_URL || "https://anologia.pythonanywhere.com"}/posts/${params.postid}/`,
          { withCredentials: true }
        );
        return response.data;
      },
      // element: <EditRecipe/>,
      // errorElement: <ErrorPage/>


    }
  ]);

  return (
    <div className="App">
      {navbar}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
