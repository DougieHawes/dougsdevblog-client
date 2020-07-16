import React from "react";
import { render } from "react-dom";

import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";

import { AuthProvider } from "./context/authContext";

import "./style.css";
import "react-toastify/dist/ReactToastify.css";

render(
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>,
  document.getElementById("root")
);
