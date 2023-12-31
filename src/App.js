import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  useRouteError,
} from "react-router-dom";

import Home from "./pages/Home";
import Posts from "./pages/Posts";
import Post from "./pages/Post";
import CreatePost from "./pages/CreatePost";
import Registration from "./pages/Registration";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import { AuthContext } from "./helpers/AuthContext";
import { useState } from "react";

import Config from "./pages/Config/Config";
//SITES ROUTES
import Sites from "./pages/Config/Sites";
//TypeParcs ROUTES
import TypeParcs from "./pages/Config/TypeParcs";
import TypeParcsList from "./components/TypeParcs/TypeParcsList";
import TypeParcCreate from "./components/TypeParcs/TypeParcCreate";
import TypeParcUpdate from "./components/TypeParcs/TypeParcUpdate";
import TypeParcDelete from "./components/TypeParcs/TypeParcDelete";
import TypeParcDetails from "./components/TypeParcs/TypeParcDetails";
//Parcs ROUTES
import Parcs from "./pages/Config/Parcs";
import ParcsList from "./components/Parcs/ParcsList";
import ParcCreate from "./components/Parcs/ParcCreate";
import ParcUpdate from "./components/Parcs/ParcUpdate";
import ParcDelete from "./components/Parcs/ParcDelete";
import ParcDetails from "./components/Parcs/ParcDetails";
//Parcs ROUTES
import Engins from "./pages/Config/Engins";
import EnginsList from "./components/Engins/EnginsList";
import EnginCreate from "./components/Engins/EnginCreate";
import EnginUpdate from "./components/Engins/EnginUpdate";
import EnginDelete from "./components/Engins/EnginDelete";
import EnginDetails from "./components/Engins/EnginDetails";

import { sitesListLoader } from "./components/Sites/sitesListLoader";

import RootLayout from "./pages/layouts/RootLayout";
import ErrorHelper from "./helpers/ErrorHelper";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="posts" exact element={<Posts />} />
      <Route path="post/:id" exact element={<Post />} />
      <Route path="createpost" exact element={<CreatePost />} />
      <Route path="auth" exact element={<Login />} />
      <Route path="profile/:id" exact element={<Profile />} />
      <Route path="auth/registration" exact element={<Registration />} />
      <Route path="changepassword" exact element={<ChangePassword />} />

      {/* START CONFIG */}
      <Route path="config" exact element={<Config />}>
        {/* SITES  */}
        <Route
          path="sites"
          element={<Sites />}
          // loader={sitesListLoader}
          // errorElement={<ErrorHelper />}
        />

        {/* TYPEPARCS  */}
        <Route path="typeparcs" element={<TypeParcs />}>
          <Route index exact element={<TypeParcsList />} />
          <Route path="create" element={<TypeParcCreate />} />
          <Route path=":id/details" element={<TypeParcDetails />} />
          <Route path=":id/update" element={<TypeParcUpdate />} />
          <Route path=":id/delete" element={<TypeParcDelete />} />
        </Route>

        {/* PARCS  */}
        <Route path="parcs" element={<Parcs />}>
          <Route index exact element={<ParcsList />} />
          <Route path="create" element={<ParcCreate />} />
          <Route path=":id/details" element={<ParcDetails />} />
          <Route path=":id/update" element={<ParcUpdate />} />
          <Route path=":id/delete" element={<ParcDelete />} />
        </Route>

        {/* ENGINS  */}
        <Route path="engins" element={<Engins />}>
          <Route index exact element={<EnginsList />} />
          <Route path="create" element={<EnginCreate />} />
          <Route path=":id/details" element={<EnginDetails />} />
          <Route path=":id/update" element={<EnginUpdate />} />
          <Route path=":id/delete" element={<EnginDelete />} />
        </Route>
      </Route>

      <Route path="*" exact element={<PageNotFound />} />
    </Route>
  )
);

function App() {
  // console.log(process.env.REACT_APP_BASE_URL);
  // to be able to access to the authstate evry where
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });
  // pour vérifier s'il y a un user connecté, car à chaque rechargement de la page authState se reinitialiser à false comme ci-dessus
  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:3001/auth/auth`, {
  //       headers: {
  //         accessToken: localStorage.getItem("accessToken"),
  //       },
  //     })
  //     .then((response) => {
  //       if (response.data.error) {
  //         setAuthState({ ...authState, status: false });
  //       } else {
  //         setAuthState({
  //           username: response.data.username,
  //           id: response.data.id,
  //           status: true,
  //         });
  //       }
  //     });
  // }, []);
  return (
    <div className="App overflow-hidden">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <RouterProvider router={router} />
      </AuthContext.Provider>
    </div>
  );
}

export default App;
