import React, { useState } from "react";
import { API_URL } from "../../data/apiPath";

const Register = ({ showLoginHandler }) => {
  // api integration

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // to prevent refreshing when we submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // api integration standord method
    //
    // endpoint for vendor registering
    try {
      const response = await fetch(`${API_URL}/vendor/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        //passing by stringifying it

        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        setUsername("");
        setEmail("");
        setPassword("");
        alert("Vendor registered successfully");
        showLoginHandler();
      }
    } catch (error) {
      console.log("registration failed", error);
      alert("Registered Failed");
    }
  };

  return (
    <div className="registerSection">
      <form className="authForm" onSubmit={handleSubmit}>
        <h3>Vendor Register</h3>

        <label>Username</label>
        {/* attributes same as our defined usestate name */}
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="enter your Name"
        />
        <br />

        <label>Email</label>

        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="enter your email"
        />
        <br />

        <label>Password</label>

        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="enter your password"
        ></input>
        <br />

        <div className="btnSubmit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
