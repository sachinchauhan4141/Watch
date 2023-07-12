const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Video = require("../models/Video");
const { body, validationResult } = require("express-validator");

//ROUTE 1 : get all videos using: GET "/api/video/fetchallvideos". requires login
router.get("/fetchallvideos", fetchuser, async (req, res) => {
  try {
    const video = await Video.find();
    res.json(video);
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
});

//ROUTE 2 : add new video using: POST "/api/video/addvideo". require login
router.post(
  "/addvideo",
  fetchuser,
  [
    body("genre", "Enter a valid genre id").isLength({ min: 1 }),
    body("id", "Enter a valid id").isLength({ min: 1 }),
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("url", "Enter valid video url").isLength({ min: 10 }),
    body("src", "Enter valid poster src").isLength({ min: 10 }),
  ],
  async (req, res) => {
    //result of validation
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ errors: err.array() });
    }
    try {
      const { genre, id, title, url, src } = req.body;
      const video = await Video.create({
        genre:genre,
        id: id,
        title: title,
        url: url,
        src: src,
      });
      res.json({'success':true,video});
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message });
    }
  }
);

//ROUTE 3 : update video using: PUT "/api/video/updatevideo". require login
router.put("/updatevideo/:id", fetchuser, async (req, res) => {
  try {
    const { genre ,id, title, url , src } = req.body;

    //creating new note
    const newVideo = {};

    if (genre) {
      newVideo.genre = genre;
    }
    if (title) {
      newVideo.title = title;
    }
    if (id) {
      newVideo.id = id;
    }
    if (url) {
      newVideo.url = url;
    }
    if (src) {
      newVideo.src = src;
    }

    //finding old note
    const oldVideo = await Video.findById(req.params.id);
    if (!oldVideo) {
      return res.status(404).json({success:false,msg:"Video Not Found..."});
    }

    // validating user
    if (req.user.isAdmin) {
      return res.status(404).json({ success: false, msg: "Not Allowed..." });
    }

    //updating old note
    const video = await Video.findByIdAndUpdate(
      req.params.id,
      { $set: newVideo },
      { new: true }
    );

    res.json({'success':true,video});
  } catch (error) {      
    res.status(500).json({ success: false, msg: error.message });
  }
});

//ROUTE 4 : delete a video using: DELETE "/api/video/deletevideo". require login
router.delete("/deletevideo/:id", fetchuser, async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({success:false,msg:"Video Not Found..."});
    }

    if (req.user.isAdmin) {
      return res.status(404).json({ success: false, msg: "Not Allowed..." });
    }

    const deletedVideo = await Video.findByIdAndDelete(req.params.id);
    res.json({'success':true,deletedVideo});
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
});

//ROUTE 5 : get a video using: GET "/api/video/getvideo". requires login
router.get("/getvideo/:id", fetchuser, async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({success:false,msg:"Video Not Found..."});
    }

    if (req.user.isAdmin) {
      return res.status(404).json({ success: false, msg: "Not Allowed..." });
    }
    res.json({'success':true,video});
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
});

module.exports = router;