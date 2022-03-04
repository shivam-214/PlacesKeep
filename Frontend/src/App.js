import React, { Fragment } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Users from "./user/pages/User";
import Auth from "./user/pages/Auth";

import MainNavigation from "./shared/component/Navigation/MainNavigation";

import NewPlace from "./places/pages/NewPlace";
import UsersPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import useAuth from "./shared/hooks/auth-hook";

function App() {
  const { token } = useAuth();

  let routes;
  if (token) {
    routes = (
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/:userId/places" element={<UsersPlaces />} />
        <Route path="/places/new" element={<NewPlace />} />
        <Route path="/places/:placeId" element={<UpdatePlace />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/:userId/places" element={<UsersPlaces />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate replace to="/auth" />} />
      </Routes>
    );
  }

  return (
    <Fragment>
      <MainNavigation />
      <main>{routes}</main>
    </Fragment>
  );
}

export default App;
