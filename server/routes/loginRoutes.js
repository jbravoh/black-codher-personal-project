const Client = require("../models/Clients");
// const { check, validationResult } = require("express-validator/check");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");

// === CREATE USER LOGIN ===

module.exports = (app) => {
  app.post(
    "/api/login",
    // [
    //   check("username", "Please enter a valid username").not().isEmpty(),
    //   check("password", "Please enter a valid password").isLength({
    //     min: 6,
    //   }),
    // ],
    async (req, res) => {
      // const errors = validationResult(req);

      // if (!errors.isEmpty()) {
      //   return res.status(400).json({
      //     errors: errors.array(),
      //   });
      // }

      // === check if username or password matches ===
      const { clientUsername, clientPassword } = req.body;

      try {
        let client = await Client.find({
          username: clientUsername,
        });

        if (!client)
          return res.status(400).json({
            message: "Incorrect username or password!",
          });

        console.log(client[0]);

        const isMatch = await bcrypt.compare(
          clientPassword,
          client[0].password
        );
        console.log(isMatch, " ====== LOOK HERE!!!!!!! ======");
        if (!isMatch)
          return res.status(400).json({
            message: "Incorrect username or password!",
          });

        const payload = {
          client: {
            id: client.id,
          },
        };

        jwt.sign(
          payload,
          "randomString",
          {
            expiresIn: 3600,
          },
          (err, token) => {
            if (err) throw err;
            res.status(200).json({
              token,
            });
          }
        );
      } catch (e) {
        console.error(e);
        res.status(500).json({
          message: "Server Error",
        });
      }
    }
  );

  // === GET LOGGEDIN USER ===

  app.get("/loggedin", auth, async (req, res) => {
    try {
      // request.client is getting fetched from Middleware after token authentication
      const client = await Client.findById(req.client.id);
      res.json(client);
    } catch (e) {
      res.send({ message: "Error in fetching user." });
    }
  });
};

// module.exports = (app) => {
//   app.post("/api/login", async (req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;
//     console.log(username, password);
//     console.log(req.body);

//     const clients = await Client.find({ username, password }); // calling function to get the data
//     if (clients.length === 1) {
//       return res.status(200).send({ token: "1234", client: clients[0] });
//     } else {
//       return res.status(401).send({ status: "failure" });
//     }

//   });
// };
