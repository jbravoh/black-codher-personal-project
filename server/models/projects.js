const mongoose = require("mongoose");
const { Schema } = mongoose;

const projectSchema = new Schema({
  client_name: String,
  project_name: String,
  project_description: String,
  location: Object,
  date: String,
  contact_information: String,
  client_id: {
    type: Schema.Types.ObjectId,
    ref: "Client",
  },
});

mongoose.model("projects", projectSchema);
