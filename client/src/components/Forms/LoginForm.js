import React, { useState } from "react";
// import clientService from "../../services/clientService";
import "../../stylesheets/Form.css";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";

//Declaring a react component

// UPDATE AND ADD THIS TO CLIENT SERVIC
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
//Add setCurrentUsername as a property in Login form
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
    // setCurrentUsername({ currentUsername: clientUsername });

    // clientService.loginUser(credientials);
    // e.preventDefault();
  };

  return (
    <>
      {/* <div className="content-wrap"> */}
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
  // setCurrentUsername: PropTypes.func.isRequired,
};

// //CLASS COMPONENTS

// class LoginForm extends React.Component {
//   constructor(props) {
//     super(props);
//     // state allows you save values, similar to a json object
//     this.state = {
//       ClientUsername: "",
//       ClientPassword: "",
//     };

//     //wire up events - handleChange used when you change something inside textbox, handleSubmit is used when you used the submit button
//     this.handleChangeClientUsername = this.handleChangeClientUsername.bind(
//       this
//     );
//     this.handleChangeClientPassword = this.handleChangeClientPassword.bind(
//       this
//     );
//   }

//   //Actual definitions of functions
//   // taking value in textbox and saving it in the state

//   handleChangeClientUsername(event) {
//     this.setState({ ClientUsername: event.target.value });
//   }
//   handleChangeClientPassword(event) {
//     this.setState({ ClientPassword: event.target.value });
//   }

//   //Sending post after pressing the submit button
//   async handleSubmit(event) {
//     const username = this.state.ClientUsername;
//     const password = this.state.ClientPassword;

//     event.preventDefault();
//     const token = await loginUser({
//       username,
//       password,
//     });
//     this.props.setToken(token)
//   }

//   render() {

//     const { setToken } = this.props; // HAVING ISSUES WITH THIS

//     return (
//       <>
//         <React.Fragment>
//           <h2 className="formTitle">Welcome Back!</h2>
//         </React.Fragment>
//         <form onSubmit={this.handleSubmit} className="formContainer">
//           <label>
//             <div className="label">Username:</div>
//             <input
//               type="text"
//               value={this.state.ClientUsername}
//               onChange={event =>this.handleChangeClientUsername(event)}
//             />
//           </label>
//           <label>
//             <div className="label">Password:</div>
//             <input
//               type="text"
//               value={this.state.Date}
//               onChange={event => this.handleClientPassword(event)}
//             />
//           </label>
//           <input type="submit" value="Sign in" className="button" />
//           <span className="sign-in-link">
//             Do not have an account? Sign up <a href="/signin">here</a>{" "}
//           </span>
//         </form>
//       </>
//     );
//   }
// }

// //Add in the PropType from the new prop and destructure the props object to pull out the setToken prop.

// LoginForm.propTypes = {
//   setToken: PropTypes.func.isRequired,
// };

export default LoginForm;
