import React, { useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

import AuthForm from "../../components/forms/AuthForm";

const Register = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const confirmationUrl = process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const config = {
      url: confirmationUrl,
      handleCodeInApp: true,
    };

    const result = await auth.sendSignInLinkToEmail(email, config);
    console.log("result", result);

    toast.success(`Email sent to ${email}. Check your inbox and junkmail`);

    window.localStorage.setItem("emailForRegistration", email);

    setEmail("");
    setLoading(false);
  };

  return (
    <div>
      <div>
        {loading ? <h4>Loading</h4> : <h4>Register</h4>}

        <AuthForm
          email={email}
          loading={loading}
          setEmail={setEmail}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Register;
