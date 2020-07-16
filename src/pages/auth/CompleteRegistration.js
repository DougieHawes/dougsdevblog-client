import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

import { AuthContext } from "../../context/authContext";

import { auth } from "../../firebase";

import AuthForm from "../../components/forms/AuthForm";

const USER_CREATE = gql`
  mutation userCreate {
    userCreate {
      username
      email
    }
  }
`;

const CompleteRegistration = () => {
  const { dispatch } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  let history = useHistory();

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, [history]);

  const [userCreate] = useMutation(USER_CREATE);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!password) {
      toast.error("password is required");
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );

      if (result.user.emailVerified) {
        window.localStorage.removeItem("emailForRegistration");
        let user = auth.currentUser;
        await user.updatePassword(password);

        const idTokenResult = await user.getIdTokenResult();
        dispatch({
          type: "LOGGED_IN_USER",
          payload: { email: user.email, token: idTokenResult.token },
        });

        userCreate();

        history.push("/profile");
      }
    } catch (error) {
      console.log("register error", error.message);
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div>
      {loading ? <h4>Loading...</h4> : <h4>Confirm your account</h4>}
      <AuthForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        showPasswordInput={true}
        loading={loading}
      />
    </div>
  );
};

export default CompleteRegistration;
