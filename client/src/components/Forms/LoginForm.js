import React, { useState } from "react";
import "../../stylesheets/Form.css";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";


async function loginUser(credentials) {
  console.log(JSON.stringify(credentials));
  return fetch("http://localhost:5000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

function LoginForm({ setClient, setToken, setIsLoggedIn }) {
  const [clientUsername, setClientUsername] = useState("");
  const [clientPassword, setClientPassword] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = await loginUser({
      clientUsername,
      clientPassword,
    });

    if (loginData.token) {
      setIsLoggedIn(true);
    }

    // setToken(loginData.token);
    // setClient(loginData.client);
    console.log(loginData);
    history.push("/dashboard");
    

    // clientService.loginUser(credientials);
    // e.preventDefault();
  };

  return (
    <>
      <React.Fragment>
        <h2 className="formTitle">Login</h2>
      </React.Fragment>

      <form onSubmit={handleSubmit} className="formContainer">
        <label>
          <div className="label">Username:</div>
          <input
            type="text"
            value={clientUsername}
            onChange={(e) => setClientUsername(e.target.value)}
          />
        </label>
        <label>
          <div className="label">Password:</div>
          <input
            type="password"
            value={clientPassword}
            onChange={(e) => setClientPassword(e.target.value)}
          />
        </label>
        <input type="submit" value="Login" className="button" />
        <div className="sign-up-sentence">
          <p>Do not have an account?</p>
          <p className="sign-up-link">
            <Link to="/signup">Sign up here</Link>
          </p>
        </div>
      </form>
    </>
  );
}
LoginForm.propTypes = {
  setToken: PropTypes.func.isRequired,
  setClient: PropTypes.func.isRequired,

};


export default LoginForm;
