import React from "react";

const AuthForm = ({
  email = "",
  password = "",
  loading,
  setEmail = (f) => f,
  setPassword,
  handleSubmit,
  showPasswordInput = false,
  showEmailInput = true,
}) => (
  <form onSubmit={handleSubmit}>
    {showEmailInput && (
      <input
        placeholder="enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
      />
    )}
    {showPasswordInput && (
      <input
        type="password"
        placeholder="enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
      />
    )}
    <button disabled={loading}>login</button>
  </form>
);

export default AuthForm;
