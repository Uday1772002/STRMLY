const Video = require("../models/Video");

exports.uploadVideo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const videoUrl = req.file.path;
    const uploader = req.user.id;

    const video = new Video({ title, description, videoUrl, uploader });
    await video.save();

    res.status(201).json(video);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

exports.getVideos = async (req, res) => {
  try {
    const videos = await Video.find({ uploader: req.user.id })
      .populate("uploader", "name")
      .sort({ createdAt: -1 });
    res.json(videos);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
