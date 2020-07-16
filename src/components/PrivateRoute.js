import React, { useState, useContext, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const PrivateRoute = ({ children, ...rest }) => {
  const { state } = useContext(AuthContext);
  const [user, setUser] = useState(false);

  useEffect(() => {
    if (state.user) {
      setUser(true);
    }
  }, [state.user]);

  const navLinks = () => (
    <nav className="private-route">
      <ul className="pr-links">
        <li className="pr-item">
          <Link className="pr-link" to="/profile">
            Profile
          </Link>
        </li>
        <li className="pr-item">
          <Link className="pr-link" to="/password/update">
            Password
          </Link>
        </li>
        <li className="pr-item">
          <Link className="pr-link" to="/post/create">
            Post
          </Link>
        </li>
      </ul>
    </nav>
  );

  const renderContent = () => (
    <div>
      <div>{navLinks()}</div>
      <Route {...rest} />
    </div>
  );

  return user ? renderContent() : <h4>Loading...</h4>;
};

export default PrivateRoute;
