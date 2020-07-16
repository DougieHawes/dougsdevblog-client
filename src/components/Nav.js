import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "firebase";
import { AuthContext } from "../context/authContext";

const Nav = () => {
  const { state, dispatch } = useContext(AuthContext);

  let history = useHistory();

  const { user } = state;

  const logout = () => {
    auth().signOut();
    dispatch({
      type: "LOGGED_IN_USER",
      payload: null,
    });
    history.push("/login");
  };

  return (
    <div className="navbar">
      <div className="navbar-logo">
        <Link to="/">Doug'sDevBlog</Link>
      </div>
      <div className="navbar-links">
        {user ? (
          <>
            <div className="navbar-link">
              <a onClick={logout} href="/login" to="/login">
                logout
              </a>
            </div>
            <div className="navbar-link">
              <Link to="/profile">{user && user.email.split("@")[0]}</Link>
            </div>
          </>
        ) : (
          <>
            <div className="navbar-link">
              <Link to="/login">login</Link>
            </div>
            <div className="navbar-link">
              <Link to="/register">register</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Nav;
