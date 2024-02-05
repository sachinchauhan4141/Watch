const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Genre = require("../models/Genre");
const { body, validationResult } = require("express-validator");

//ROUTE 1 : get all genre using: GET "/api/genre/fetchallgenres". requires login
router.get("/fetchallgenres", async (req, res) => {
  try {
    const genre = await Genre.find();
    res.json(genre);
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
});

//ROUTE 2 : add new genre using: POST "/api/genre/addgenre". require login
router.post(
  "/addgenre",
  fetchuser,
  [
    body("id", "Enter a valid id").isLength({ min: 1 }),
    body("title", "Enter a valid title").isLength({ min: 3 }),
  ],
  async (req, res) => {
    //result of validation
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ errors: err.array() });
    }
    try {
      const { id, title } = req.body;
      const genre = await Genre.create({
        id: id,
        title: title,
      });
      res.json({ success: true, genre });
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message });
    }
  }
);

//ROUTE 3 : update genre using: PUT "/api/genre/updategenre". require login
router.put("/updategenre/:id", fetchuser, async (req, res) => {
  try {
    const { id, title } = req.body;
    //creating new note
    const newGenre = {};

    if (title) {
      newGenre.title = title;
    }
    if (id) {
      newGenre.id = id;
    }

    //finding old note
    const oldGenre = await Genre.findById(req.params.id);
    if (!oldGenre) {
      res.status(404).json({ success: false, msg: "Genre Not Found..." });
    }

    //validating user
    if (req.user.isAdmin) {
      return res.status(404).json({ success: false, msg: "Not Allowed..." });
    }

    //updating old note
    const genre = await Genre.findByIdAndUpdate(
      req.params.id,
      { $set: newGenre },
      { new: true }
    );
    res.json({ success: true, genre });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
});

//ROUTE 4 : delete a genre using: DELETE "/api/genre/deletegenre". require login
router.delete("/deletegenre/:id", fetchuser, async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);
    if (!genre) {
      return res.status(404).json({ success: false, msg: "Genre Not Found..." });
    }

    if (req.user.isAdmin) {
      return res.status(404).json({ success: false, msg: "Not Allowed..." });
    }

    const deletedGenre = await Genre.findByIdAndDelete(req.params.id);

    res.json({ success: true, deletedGenre });
  } catch (error) {    
    res.status(500).json({ success: false, msg: error.message });
  }
});

module.exports = router;
