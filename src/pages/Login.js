import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import { Context } from "../utils/UserContext";
import "./Login.css";

function Login() {
  const { user, setUser } = useContext(Context);

  const [signUp, setSignUp] = useState(false);
  const [login, setLogin] = useState(false);

  function handleLogin() {
    setLogin((prev) => !prev);
    setSignUp(false);
  }
  function handleSignUp() {
    setSignUp((prev) => !prev);
    setLogin(false);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setUser({ [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  const signUpForm = (
    <div>
      <form>
        <input
          type="text"
          name="username"
          placeholder="username..."
          required
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="email..."
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="password..."
          required
          onChange={handleChange}
        />
        <button onSubmit={handleSubmit}>Sign Up</button>
      </form>
    </div>
  );
  const loginForm = (
    <div>
      <form>
        <input
          type="text"
          name="username"
          placeholder="username..."
          required
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="password..."
          required
          onChange={handleChange}
        />
        <button onSubmit={handleSubmit}>Login</button>
      </form>
    </div>
  );

  return (
    <div className="login-main">
      <h4>Welcome to TypeTrainer!</h4>
      {signUp && signUpForm}
      {login && loginForm}
      <div className="btn-container">
        <Button onClick={handleSignUp}>Sign Up</Button>
        <Button onClick={handleLogin}>Login</Button>
      </div>
      <Button>Continue as Guest</Button>
    </div>
  );
}

export default Login;
