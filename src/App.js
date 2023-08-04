import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NavBar from "./components/NavBar";
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
import { useState, useEffect } from "react";
import axios from "axios";
import Config from "./pages/Config/Config";
//SITES ROUTES
import Sites from "./pages/Config/Sites";
import SiteDetails from "./components/Sites/SiteDetails";
import SiteDelete from "./components/Sites/SiteDelete";
import SiteUpdate from "./components/Sites/SiteUpdate";
import SitesList from "./components/Sites/SitesList";
import SiteCreate from "./components/Sites/SiteCreate";
//SITES ROUTES
//SITES ROUTES
import TypeParcs from "./pages/Config/TypeParcs";
import TypeParcsList from "./components/TypeParcs/TypeParcsList";
import TypeParcCreate from "./components/TypeParcs/TypeParcCreate";
import TypeParcUpdate from "./components/TypeParcs/TypeParcUpdate";
//
import Parcs from "./pages/Config/Parcs";
import Engins from "./pages/Config/Engins";

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
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" exact element={<Posts />} />
            <Route path="/post/:id" exact element={<Post />} />
            <Route path="/createpost" exact element={<CreatePost />} />
            <Route path="/auth" exact element={<Login />} />
            <Route path="/profile/:id" exact element={<Profile />} />
            <Route path="/auth/registration" exact element={<Registration />} />
            <Route path="/changepassword" exact element={<ChangePassword />} />

            {/* START CONFIG */}
            <Route path="config" exact element={<Config />}>
              {/* SITES  */}
              <Route path="sites" element={<Sites />}>
                <Route index exact element={<SitesList />} />
                <Route path="create" element={<SiteCreate />} />
                <Route path=":id/details" element={<SiteDetails />} />
                <Route path=":id/update" element={<SiteUpdate />} />
                <Route path=":id/delete" element={<SiteDelete />} />
              </Route>

              {/* TYPEPARCS  */}
              <Route path="typeparcs" element={<TypeParcs />}>
                <Route index exact element={<TypeParcsList />} />
                <Route path="create" element={<TypeParcCreate />} />
                {/* <Route path=":id/details" element={<SiteDetails />} /> */}
                <Route path=":id/update" element={<TypeParcUpdate />} />
                {/* <Route path=":id/delete" element={<SiteDelete />} /> */}
              </Route>

              <Route path="typeparcs" exact element={<TypeParcs />} />
              <Route path="parcs" exact element={<Parcs />} />
              <Route path="engins" exact element={<Engins />} />
            </Route>

            <Route path="*" exact element={<PageNotFound />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
