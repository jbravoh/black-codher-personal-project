import React from "react";
import "../stylesheets/ProjectProfile.css";
import { Link, useLocation } from "react-router-dom";
// import projectService from "../services/projectService";

function ProjectProfile() {
  let location = useLocation();
  let { project } = location.state;

  console.log(project);

  const renderProject = (project) => {
    return (
      <li key={project.id} className="profile">
        <div className="profile-header">
          <h2 className="profile-name">{`${project.project_name}`} </h2>
          <h3 className="profile-client-name">{`${project.client_name}`}</h3>
          <p className="profile-location">{`${project.location.Region}, ${project.location.Country}`}</p>
        </div>
          {/* <div className="flex">
            <p className="profile-Location">{`${project.location.Region}, ${project.location.Country}`}</p>
            <p className="profile-date">Deadline: {`${project.date}`}</p>
          </div> */}
          <h4 className="profile-subheading">Description </h4>
          <p className="profile-description">{`${project.project_description}`}</p>
       
        <Link to="/projectprofile">
          <button className="apply-button">Get In Touch</button>
        </Link>
      </li>
    );
  };

  return (
    <>
      {/* <h1 className="profile-title">Details</h1>; */}
      <div>
        <ul className="container">
          {project ? (
            renderProject(project)
          ) : (
            <p> No project details to display </p>
          )}
        </ul>
      </div>
    </>
  );
}

export default ProjectProfile;
