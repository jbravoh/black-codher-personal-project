const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// IMPORT YOUR MODELS
require("./models/Users");
require("./models/Projects");
require("./models/Clients");

const app = express(); // CHECK IF THIS IS CORRECT
app.use(cors());

mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.MONGODB_URI ||
    `mongodb://localhost:27017/black-codher-personal-project`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true }));

// IMPORT YOUR ROUTES
require("./routes/usersRoutes")(app);
require("./routes/projectRoutes")(app);
require("./routes/clientRoutes")(app);
require("./routes/loginRoutes")(app);

// app.use(".routes/clientRoutes");

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
