import React, { useState } from "react";
import { toast } from "react-toastify";

import { auth } from "../../firebase";

import AuthForm from "../../components/forms/AuthForm";

const PasswordForgot = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const config = {
      url: process.env.REACT_APP_PASSWORD_FORGOT_REDIRECT,
      handleCodeInApp: true,
    };
    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        toast.success(`email sent to ${email}`);
        setEmail("");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log("error on password email", error);
      });
  };

  return (
    <div className="forgot-password">
      {loading ? <h4>Loading...</h4> : <h4>Forgot Password</h4>}
      <AuthForm
        email={email}
        loading={loading}
        setEmail={setEmail}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default PasswordForgot;
