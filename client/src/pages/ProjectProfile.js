import React, { useState, useEffect } from "react";
import "../stylesheets/ProjectProfile.css";
import { Link } from "react-router-dom";
import projectService from "../services/projectService";

function ProjectProfile() {
  const [projects, setprojects] = useState(null);

  useEffect(() => {
    if (!projects) {
      getprojects();
    }
  });

  const getprojects = async () => {

    let res = await projectService.getAll();
    setprojects(res);
  };

  const renderProject = (project) => {
    return (
      <li key={project.id} className="project-profile">
        <div className="project-elements">
          <h3 className="project-name">{`${project.project_name}`} </h3>
          <h4 className="client-name">{`${project.client_name}`}</h4>
          <h5 className="project-Location">{`${project.location.Region}, ${project.location.Country}`}</h5>
          <p className="project-date">{`${project.date}`}</p>
          <p className="project-description">{`${project.project_description}`}</p>
        </div>
        <Link to="/projectprofile">
          <button className="Apply">Apply</button>
        </Link>
      </li>
    );
  };

  return (
    <>
      <h1 className="profile-header">Details</h1>;
      <div>
        <ul className="projects-container">
          {projects && projects.length > 0 ? (
            projects.map((project) => renderProject(project)) // looping through project and rendering on the screen
          ) : (
            <p> No projects found </p>
          )}
        </ul>
      </div>
    </>
  );
}

export default ProjectProfile;
