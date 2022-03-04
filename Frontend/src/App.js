import React, { useEffect, Fragment } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { authActions } from "./store/auth-slice";

import Users from "./user/pages/User";
import Auth from "./user/pages/Auth";

import MainNavigation from "./shared/component/Navigation/MainNavigation";

import NewPlace from "./places/pages/NewPlace";
import UsersPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";

let logoutTimer;

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const tokenExpirationTimeInMs = useSelector(
    (state) => state.auth.tokenExpirationTimeInMs
  );

  useEffect(() => {
    if (token && tokenExpirationTimeInMs) {
      const remainingTime =
        new Date(tokenExpirationTimeInMs).getTime() - new Date().getTime();

      const logoutHandler = () => {
        dispatch(authActions.logout());
      };

      logoutTimer = setTimeout(logoutHandler, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, tokenExpirationTimeInMs, dispatch]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));

    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration).getTime() > new Date().getTime()
    ) {
      dispatch(
        authActions.login({
          userId: storedData.userId,
          token: storedData.token,
          expiration: new Date(storedData.expiration),
        })
      );
    }
  }, [dispatch]);

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
