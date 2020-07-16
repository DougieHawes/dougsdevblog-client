import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { toast } from "react-toastify";
import { auth, googleAuthProvider } from "../../firebase";
import { AuthContext } from "../../context/authContext";

import AuthForm from "../../components/forms/AuthForm";

const USER_CREATE = gql`
  mutation userCreate {
    userCreate {
      username
      email
    }
  }
`;

const Login = () => {
  const { dispatch } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  let history = useHistory();

  const [userCreate] = useMutation(USER_CREATE);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await auth
        .signInWithEmailAndPassword(email, password)
        .then(async (res) => {
          const { user } = res;
          const idTokenResult = await user.getIdTokenResult();

          dispatch({
            type: "LOGGED_IN_USER",
            payload: { email: user.email, token: idTokenResult.token },
          });

          userCreate();
          history.push("/profile");
        });
    } catch (error) {
      console.log("login error", error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const googleLogin = () => {
    auth.signInWithPopup(googleAuthProvider).then(async (res) => {
      const { user } = res;
      const idTokenResult = await user.getIdTokenResult();

      dispatch({
        type: "LOGGED_IN_USER",
        payload: { email: user.email, token: idTokenResult.token },
      });

      userCreate();
      history.push("/profile");
    });
  };

  return (
    <div>
      {loading ? <h4>Loading...</h4> : <h4>Login</h4>}
      <AuthForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        showPasswordInput={true}
        loading={loading}
      />
      <button onClick={googleLogin} className="google-login-button">
        Login with Google
      </button>
      <p>
        forgot password? click <Link to="/password/forgot">here</Link>
      </p>
    </div>
  );
};

export default Login;
