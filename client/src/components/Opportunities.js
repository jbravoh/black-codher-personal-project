import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Opportunities() {
  const [projects, setProjects] = useState([]);

  const getProjects = () => {
    axios
      .get(`http://localhost:5000/api/project`)
      .then((results) => {
        setProjects(results.data);
      })
      .catch((error) => console.log(error.results));
  };

  useEffect(() => {
    if (!projects.length) {
      getProjects();
    }
  });

  const renderProject = (project) => (
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

  return (
    <div>
      <h1 className="projects-header">Opportunities</h1>
      <ul className="projects-container">
        {projects.length ? (
          projects.map((project) => renderProject(project))
        ) : (
          <p> No projects found </p>
        )}
      </ul>
    </div>
  );
}

export default Opportunities;

