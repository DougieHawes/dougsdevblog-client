import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import { auth } from "../../firebase";

import AuthForm from "../../components/forms/AuthForm";
import { AuthContext } from "../../context/authContext";

const PasswordUpdate = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        toast.success("Password Updated");
        history.push("/profile");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };

  return (
    <div>
      {loading ? <h4>Loading...</h4> : <h4>Password Update</h4>}
      <AuthForm
        password={password}
        setPassword={setPassword}
        loading={loading}
        handleSubmit={handleSubmit}
        showPasswordInput={true}
        showEmailInput={false}
      />
    </div>
  );
};

export default PasswordUpdate;
