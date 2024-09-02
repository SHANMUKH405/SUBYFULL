import React, { useState } from "react";
import { API_URL } from "../../data/apiPath";

const Login = ({ showWelcomeHandler }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginaHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/vendor/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setEmail("");
        setPassword("");
        alert("Login Successful");

        // storing our token in local storage
        localStorage.setItem("logintoken", data.token);
        showWelcomeHandler();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="loginSection">
      <form className="authForm" onSubmit={loginaHandler}>
        <h3>Vendor Login</h3>

        <label>Email</label>
        <br />
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="enter your email"
        />
        <br />

        <label>Password</label>
        <br />
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="enter your password"
        ></input>
        <br />

        <div className="btnSubmit">
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
