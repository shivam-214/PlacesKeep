import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import classes from "./NavLinks.module.css";
import { authActions } from "../../../store/auth-slice";

const activeClassHandler = ({ isActive }) =>
  isActive ? `${classes.active}` : "";

const NavLinks = (props) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(authActions.logout());
    navigate("/auth", { replace: true });
  };

  return (
    <ul className={classes["nav-links"]}>
      <li>
        <NavLink to="/" end className={activeClassHandler}>
          ALL USERS
        </NavLink>
      </li>
      {isLoggedIn && (
        <li>
          <NavLink to="/u1/places" className={activeClassHandler}>
            MY PLACES
          </NavLink>
        </li>
      )}
      {isLoggedIn && (
        <li>
          <NavLink to="/places/new" className={activeClassHandler}>
            ADD PLACE
          </NavLink>
        </li>
      )}
      {!isLoggedIn && (
        <li>
          <NavLink to="/auth" className={activeClassHandler}>
            AUTHENTICATION
          </NavLink>
        </li>
      )}
      {isLoggedIn && (
        <li>
          <button onClick={logoutHandler}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
