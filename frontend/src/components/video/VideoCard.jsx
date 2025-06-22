import React from "react";

const VideoCard = ({ video }) => {
  return (
    <div className="video-card">
      <video className="video-player" src={video.videoUrl} controls />
      <div className="video-info">
        <h3>{video.title}</h3>
        <p className="video-description">{video.description}</p>
        <div className="video-meta">
          <span>By: {video.uploader?.name || "Unknown"}</span>
          <span>{new Date(video.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
