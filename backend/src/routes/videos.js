const express = require("express");
const { uploadVideo, getVideos } = require("../controllers/videoController");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");

const router = express.Router();

router.post("/upload", auth, upload.single("video"), uploadVideo);
router.get("/", auth, getVideos);

module.exports = router;
