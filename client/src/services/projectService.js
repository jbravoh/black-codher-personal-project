/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import appId from "../components/useCurrentUsername";

export default {
  getAll: async () => {
    //name of function
    const res = await axios.get(`/api/project`); //module that you can call api's - inside is the route
    console.log(res.data);
    return res.data || [];
  },

  //Pass in newProject in the parameter to link it to the information in the Project Form
  createProject: async (newProject) => {
    console.log(newProject);
    console.log(appId().getId());
    await axios.post(`/api/project?client_id=${appId().getId()}`, newProject);
  },
};

// Why is it NewClient???
