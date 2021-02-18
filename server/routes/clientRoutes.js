const Client = require("../models/Clients");
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ==== SIGNUP ====

module.exports = (app) => {
  // === validation ====
  app.post(
    "/api/client",
    [
      check("client_name", "Please enter your company name").not().isEmpty(),
      check("username", "Please enter a valid username.").not().isEmpty(),
      check("email", "Please enter a valid email.").isEmail(),
      check("password", "Please enter a valid password").isLength({
        min: 6,
      }),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }

      // === search datatbase to see if email exists

      const { email, password } = req.body;
      console.log(req.body);
      try {
        let client = await Client.findOne({ email });
        if (client) {
          return res.status(400).json({
            msg: "User already exists.",
          });
        }

        // === create new client ====

        client = new Client(req.body);

        // === THIS WAS THE ORIGINAL CODE

        // const newClient = await Client.create(req.body);
        // return res.status(201).send({
        //   error: false,
        //   newClient,
        // });

        const salt = await bcrypt.genSalt(10);
        client.password = await bcrypt.hash(password, salt);

        await client.save();
        console.log(req.body);
        const payload = {
          client: {
            id: client.id,
          },
        };

        jwt.sign(
          payload,
          "randomString",
          {
            expiresIn: 1000,
          },
          (err, token) => {
            if (err) throw err;
            res.status(200).json({
              token,
            });
          }
        );
      } catch (err) {
        console.log(err.message);
        res.status(400).send("Error in Saving");
      }
    }
  );
};

// bcrypt.hash(password, saltRounds, (err, hash) => {
//   if (err) {
//     console.log(err)
//   }
//   db.query(
//     "INSERT INTO users (username, password) VALUES (?,?)",
//     [username, hash],
//     (err, result) => {
//       console.log(err)
//     }
//   )
// })

// DO NOT NEED TO GET ALL CLIENTS/USERS

// GET - get clients/users
// app.get("/api/client", async (req, res) => {
//   const clients = await Client.find();
//   return res.status(200).send(clients);
// });

// //POST route to register a user
// app.post('/api/client', function(req, res) {
//   const { email, username, password } = req.body;
//   const user = new user({ email, username, password });
//   user.save(function(err) {
//     if (err) {
//       res.status(500)
//         .send("Error registering new user please try again.");
//     } else {
//       res.status(200).send("Welcome to Experience!")
//     }
//   })
// });

//LOGIN

// POST - login functionality

// http://localhost:5000/api/client
