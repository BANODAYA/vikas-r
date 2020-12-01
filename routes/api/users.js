const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load User model
const User = require("../../modal/User");
//const Rentalcalculator = require("../../Backend/rentalcalculator");//kch
const path = require('path');
var fs = require('fs');
const auth = require('../../middleware/authenticate');






router.post("/register", (req, res) => {
    // Form validation
  
    const { errors, isValid } = validateRegisterInput(req.body);
  
    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        const newUser = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password
        });
  
        // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
  });
  
 
  router.post("/login", (req, res) => {
    // Form validation
  
    const { errors, isValid } = validateLoginInput(req.body);
  
    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    const email = req.body.email;
    const password = req.body.password;
    // res.send(email);
  
    // Find user by email
    User.findOne({ email }).then(user => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }
      
  
      // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: user.id,
            firstName: user.firstName
          };
  
          // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              res.header('x-auth-token', token).json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
  });

  // router.get("/rentalCalulator", async (req, res) => {
  //   // const response = await client.search({
  //   //   searchType: "Rentalcalulator"
  //   // })
  //   // const rc = response.json
  //   // console.log(rc);
  //   // res.json(rc);
  //   // try {
  //   //   res.status(200).json({
  //   //     data: Rentalcalculator
  //   //   });
  //   // } catch (err) {
  //   //   res.status(400).json({
  //   //     message: "Some error occured",
  //   //     err
  //   //   });
  //   // }
  //   // res.console.log(Rentalcalculator);
  //   // res.send(rc);
  //   fs.writeFile(Rentalcalculator.fileName, JSON.stringify(Rentalcalculator.file), function writeJSON(err) {
  //     if (err) return console.log(err);
  //     var updatedJson = JSON.stringify(Rentalcalculator.file);
  //     console.log(JSON.parse(updatedJson));
  //     console.log('writing to ' + Rentalcalculator.fileName);
  //     res.send.JSON.parse(updatedJson);
  //     res.console.log(JSON.parse(updatedJson));
  //   });
  // });

  router.get('/rentalCalculator', function (req, res) {
    console.log("Got a GET request for list of data");

    let reqPath = path.join(__dirname,'../../property.json');

    fs.readFile(reqPath, 'utf8', function (err, data) {
      if(!err) {
        console.log("Success"+data);

        var jsonObj = JSON.parse(data)
        res.end(data);
        // res.send({message: "we did it"});
        // res.send("hi");
      }else{
        res.end("Error: "+err)
      }
    })
  })

  router.get('/me', auth, async (req, res) => {
    try{
      const user = await User.findOne(req.user.email).select('-password');
      if(user) {
        res.status(200).json({
          user
        })
      }
    }catch (err) {
      res.status(501).json({
        message: 'Error in Fetching user'
        })
    }
  })
  
  module.exports = router;
  