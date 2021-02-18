import React, { useState } from "react";
import clientService from "../../services/clientService";
import "../../stylesheets/Form.css";
import { Link } from "react-router-dom";
// import FileUploader from "../FileUploader";

function SignUpForm() {
  const [ClientName, setClientName] = useState("");
  const [ClientEmail, setClientEmail] = useState("");
  const [ClientUsername, setClientUsername] = useState("");
  const [ClientPassword, setClientPassword] = useState("");

  const handleReset = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    setClientName("");
    setClientEmail("");
    setClientUsername("");
    setClientPassword("");
  };

  const handleSubmit = async (e) => {
    alert("Your sign up is complete!");

    var newClient = {
      client_id: 0,
      client_name: ClientName,
      email: ClientEmail,
      username: ClientUsername,
      password: ClientPassword,
    };

    //create the actual project
    clientService.createClient(newClient);
    e.preventDefault();
    handleReset();
  };

  return (
    <>
      {/* <div className="content-wrap"> */}
      <React.Fragment>
        <h2 className="formTitle">Create a New Account</h2>
      </React.Fragment>
      <form onSubmit={handleSubmit} className="formContainer">
        <label>
          <div className="label">Company Name:</div>
          <input
            type="textarea"
            value={ClientName}
            onChange={(e) => setClientName(e.target.value)}
          />
        </label>
        <label>
          <div className="label">Email</div>
          <input
            type="email"
            value={ClientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
          />
        </label>
        <label>
          <div className="label">Username:</div>
          <input
            type="text"
            value={ClientUsername}
            onChange={(e) => setClientUsername(e.target.value)}
          />
        </label>
        <label>
          <div className="label">Password:</div>
          <input
            type="password"
            value={ClientPassword}
            onChange={(e) => setClientPassword(e.target.value)}
          />
        </label>
        <input type="submit" value="Sign up" className="button" />
        <div className="login-sentence">
          <p>Already have an account?</p>
          <p className="login-link">
            <Link to="/login">Login here</Link>
          </p>
        </div>
      </form>
      {/* </div> */}
    </>
  );
}

export default SignUpForm;
