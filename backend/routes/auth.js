const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const JWT_SECRET = process.env.JWT_SECRET;

//ROUTE 1 : create a user using: POST "/api/auth/createuser". doesnt require login
router.post(
  "/createuser",
  [
    //validation of user details
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "password length must be > 5").isLength({ min: 6 }),
  ],
  async (req, res) => {
    //result of validation i.e. error or !
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ errors: err.array() });
    }
    try {
      let success = false;
      //check weather user already exists or not
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({success, error: "user already exists" });
      }
      //creating a new user
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({success, authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("internal server error!");
    }
  }
);

//ROUTE 2 : authenticate a user using: POST "/api/auth/login". doesn't require login
router.post(
  "/login",
  [
    //validation of user details
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password can't be blank").exists(),
  ],
  async (req, res) => {
    //result of validation i.e. error or !
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ errors: err.array() });
    }

    const { email, password } = req.body;
    try {
      let success = false;
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({success, error: "incorrect credentials!" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({success, error: "incorrect credentials!" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({success, authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("internal server error!");
    }
  }
);

//ROUTE 3 : getuser using: POST "/api/auth/getuser". require login
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("internal server error!");
  }
});

//ROUTE 4 : updateuser using: PUT "/api/auth/updateuser". require login
router.put("/updateuser", fetchuser, async (req, res) => {
  try {
    const { name, email } = req.body;

    //creating new note
    const newCreds = {};
    if (name) {
      newCreds.name = name;
    }
    if (email) {
      newCreds.email = email;
    }

    const userId = req.user.id;
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: newCreds },
      { new: true }
    );
    res.json({ success: true, user });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("internal server error!");
  }
});

module.exports = router;
