import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import Header from "../src/components/Header";
// import projectService from "./services/projectService";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import ProjectForm from "./components/Forms/ProjectForm";
import "./stylesheets/App.css";
import SignUpForm from "./components/Forms/SignUpForm";
import LoginForm from "./components/Forms/LoginForm";
import Search from "./components/Search";

import Dashboard from "./pages/Dashboard";
import ClientProjects from "./pages/ClientProjects";
import Opportunities from "./components/Opportunities";
import Footer from "./components/Footer";
import { Link } from "react-router-dom";
import ProjectProfile from "./pages/ProjectProfile";
import useToken from "./components/useToken"; //TEST
import axios from "axios";
import appId from "./components/useCurrentUsername";

function App() {
  const [searchedProjects, setSearchedProjects] = useState([]);
  const { token, setToken } = useToken(); //TEST
  // const [client, setClient] = useState({});
  const [hasSearched, setHasSearched] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  // const [token, setToken] = useState();
  // const [currentUsername, setCurrentUsername] = useCurrentUsername();

  // useEffect(() => {
  //   if (!projects) {
  //     getprojects();
  //   }
  // });

  // const getprojects = async () => {
  //   // copy this and three const and create versions for projects
  //   let res = await projectService.getAll();
  //   setprojects(res);
  // };

  const renderProject = (project) => {
    return (
      <li key={project.id} className="project-profile">
        <div className="project-elements">
          <h3 className="project-name">{`${project.project_name}`} </h3>
          <h4 className="client-name">{`${project.client_name}`}</h4>
          <h5 className="project-Location">{`${project.location?.Region}, ${project.location?.Country}`}</h5>
          <Link
            to={{
              pathname: "/projectprofile",
              state: {
                project: project,
              },
            }}
          >
            <button className="view-project">View</button>
          </Link>
        </div>
      </li>
    );
  };

  // const renderSearchProject = (projects) => {
  //   setSearchedProjects(projects);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(`http://localhost:5000/api/project?term=${searchTerm}`)
      .then((results) => {
        setSearchedProjects(results.data);
        setHasSearched(true);
        setTimeout(() => {
          setHasSearched(false);
        }, 3000);
      })
      .catch((error) => console.log(error.results));
  };

  const handleSearchResults = () => {
    if (searchedProjects.length > 0) {
      // looping through project and rendering on the screen
      return searchedProjects.map((project) => renderProject(project));
    } else if (hasSearched) {
      return <p>No Projects Found!</p>;
    }
  };

  return (
    //32-41 telling the app what to do
    <>
      <div className="content-wrap">
        <Router>
          <Navbar token={token} />{" "}
          <Route
            exact
            path="/"
            render={() => (
              <React.Fragment>
                <p className="tagline">
                  Find <span className="tagline-span-1">opportunities</span> and
                  build up your <span className="tagline-span-2">CV</span>
                </p>
                <form onSubmit={handleSubmit} className="search">
                  <input
                    className="input"
                    type="text"
                    value={searchTerm}
                    placeholder="Search Projects..."
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                    }}
                  ></input>
                  <button type="submit" className="searchButton">
                    Search
                  </button>
                </form>
                <div>
                  <ul className="projects-container">
                    {handleSearchResults()}
                  </ul>
                </div>
              </React.Fragment>
            )}
          />
          <Route
            exact
            path="/opportunities"
            render={() => (
              <React.Fragment>
                <Opportunities />

                {/* <div>
                  <ul className="projects-container">
                    {searchedProjects && searchedProjects.length > 0 ? (
                      searchedProjects.map((project) => renderProject(project)) // looping through project and rendering on the screen
                    ) : (
                      <p> No projects found </p>
                    )}
                  </ul>
                </div> */}
                {/* <h1 className="projects-header">Opportunities</h1>
                <div>
                  <ul className="projects-container">
                    {projects && projects.length > 0 ? (
                      projects.map((project) => renderProject(project)) // looping through project and rendering on the screen
                    ) : (
                      <p> No projects found </p>
                    )}
                  </ul>
                </div> */}
              </React.Fragment>
            )}
          />
          <Route
            exact
            path="/projectprofile"
            render={() => (
              <React.Fragment>
                <ProjectProfile />
              </React.Fragment>
            )}
          />
          <Route
            exact
            path="/about"
            render={() => (
              <React.Fragment>
                <About />
              </React.Fragment>
            )}
          />
          <Route
            exact
            path="/dashboard"
            render={() => (
              <React.Fragment>
                <Dashboard />
                {/* <Dashboard currentUsername={currentUsername} /> */}
              </React.Fragment>
            )}
          />
          <Route
            exact
            path="/clientprojects"
            render={() => (
              <React.Fragment>
                <ClientProjects />
              </React.Fragment>
            )}
          />
          <Route
            exact
            path="/projectform"
            render={() => (
              <React.Fragment>
                <ProjectForm />
              </React.Fragment>
            )}
          />
          <Route
            exact
            path="/login"
            render={() => (
              <React.Fragment>
                <LoginForm
                  setToken={setToken}
                  setClient={appId().setId}
                  // setCurrentUsername={setCurrentUsername}
                />
              </React.Fragment>
            )}
          />
          <Route
            exact
            path="/signup"
            render={() => (
              <React.Fragment>
                <SignUpForm />
              </React.Fragment>
            )}
          />
        </Router>
      </div>

      <Footer />
    </>
  );
}

export default App;

//Task get it to list projects instead & create service etc

// SERVICES - calling the api's created
// import userService from './services/userService'; // create a projectService (copy line by line)

// function App() {
//   const [users, setusers] = useState(null);

//   useEffect(() => { // checks if there is any users (line 7)
//     if (!users) {
//       getusers();
//     }
//   });

//   const getusers = async () => { // copy this and three const and create versions for projects
//     let res = await userService.getAll();
//     setusers(res);
//   };

//   const renderUser = (user) => {
//     return (
//       <li key={user._id}>
//         <h3>
//           {`${user.first_name}
//           ${user.last_name}`}
//         </h3>
//         <p>{user.location}</p>
//       </li>
//     );
//   };

//   return ( //32-41 telling the app what to do
//     <div>
//       <ul>
//         {users && users.length > 0 ? (
//           users.map((user) => renderUser(user)) // looping through users and rendering on the screen
//         ) : (
//           <p>No users found</p>
//         )}
//       </ul>
//     </div>
//   );
// }

// export default App
