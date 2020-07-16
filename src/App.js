import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ApolloClient from "apollo-boost";
import { ApolloProvider as Provider } from "@apollo/react-hooks";

import { AuthContext } from "./context/authContext";

import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import CompleteRegistration from "./pages/auth/CompleteRegistration";
import PasswordUpdate from "./pages/auth/PasswordUpdate";
import PasswordForgot from "./pages/auth/PasswordForgot";
import Login from "./pages/auth/Login";
import Nav from "./components/Nav";
import Post from "./pages/post/Post";
import Profile from "./pages/auth/Profile";

import PrivateRoute from "./components/PrivateRoute";

const uri = process.env.REACT_APP_GRAPHQL_ENDPOINT;

const App = () => {
  const { state } = useContext(AuthContext);

  const { user } = state;

  const client = new ApolloClient({
    uri,
    request: (operation) => {
      operation.setContext({
        headers: {
          authtoken: user ? user.token : "",
        },
      });
    },
  });

  return (
    <Provider client={client}>
      <div className="app">
        <Nav />
        <ToastContainer />
        <div className="route-box">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route
              exact
              path="/complete-registration"
              component={CompleteRegistration}
            />
            <Route exact path="/login" component={Login} />
            <PrivateRoute
              exact
              path="/password/update"
              component={PasswordUpdate}
            />
            <Route exact path="/password/forgot" component={PasswordForgot} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute exact path="/post/create" component={Post} />
          </Switch>
        </div>
      </div>
    </Provider>
  );
};

export default App;
