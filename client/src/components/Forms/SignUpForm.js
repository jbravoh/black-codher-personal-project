import React, { useState } from "react";
import clientService from "../../services/clientService";
import "../../stylesheets/Form.css";
import { Link } from "react-router-dom";
// import FileUploader from "../FileUploader";

//FIELDS DO NOT CLEAR AFTER SUBMISSION

function SignUpForm() {
  // const [ClientFirstName, setClientFirstName] = useState("");
  // const [ClientLastName, setClientLastName] = useState("");
  const [CompanyName, setCompanyName] = useState("");
  // const [CompanyLogo, setCompanyLogo] = useState("");
  const [ClientEmail, setClientEmail] = useState("");
  const [ClientUsername, setClientUsername] = useState("");
  const [ClientPassword, setClientPassword] = useState("");

  // const handleFileInput = (e) => {
  //   // handle validations - NEED TO DEFINE!!!!
  //   setCompanyLogo(e.target.value);
  // };
  // if (fileInput.size > 1024) {
  //   onFileSelectError({ error: "File size cannot exceed more than 1MB" });
  // } else onFileSelectSuccess(file);

  const handleSubmit = async (e) => {
    alert("Your sign up is complete!");

    var newClient = {
      client_id: 0,
      // first_name: ClientFirstName,
      // last_name: ClientLastName,
      company_name: CompanyName,
      // company_logo: CompanyLogo,
      email: ClientEmail,
      username: ClientUsername,
      password: ClientPassword,
    };

    //create the actual project
    clientService.createClient(newClient);
    e.preventDefault();
  };

  return (
    <>
      {/* <div className="content-wrap"> */}
      <React.Fragment>
        <h2 className="formTitle">Create a New Account</h2>
      </React.Fragment>
      <form onSubmit={handleSubmit} className="formContainer">
        {/* <label>
            <div className="label">First Name:</div>
            <input
              type="text"
              value={ClientFirstName}
              onChange={(e) => setClientFirstName(e.target.value)}
            />
          </label>
          <label>
            <div className="label">Last Name:</div>
            <input
              type="text"
              value={ClientLastName}
              onChange={(e) => setClientLastName(e.target.value)}
            />
          </label> */}
        <label>
          <div className="label">Company Name:</div>
          <input
            type="textarea"
            value={CompanyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </label>
        {/* COMPANY LOGO UPLOADER
          <label>
            <div className="label">Company Logo:</div>
            {/* <input
              type="file"
              value={CompanyLogo}
              onChange={(e) => setCompanyLogo(e.target.value)}
              className="company-log-btn"
            /> */}

        {/* <input
              id="file"
              type="file"
              value={CompanyLogo}
              onChange={handleFileInput}
              className="logo-upload"
            ></input> */}
        {/* <button
              onClick={(e) => fileInput.current && fileInput.current.click(e)}
              className="logo-upload-btn"
            ></button> */}
        {/* </label> */}
        <label>
          <div className="label">Email</div>
          <input
            type="text"
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
            type="text"
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
