import React, { useState, useEffect } from "react";
import api from "../../services/api";
import VideoCard from "./VideoCard";
// We can re-use styles from App.css, 
const VideoFeed = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await api.get("/videos");
        setVideos(res.data);
      } catch (err) {
        setError("Failed to fetch videos. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  if (loading) return <div className="loading">Loading videos...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="feed-container">
      <h2>Public Feed</h2>
      {videos.length > 0 ? (
        <div className="videos-grid">
          {videos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      ) : (
        <p className="no-videos">No videos have been uploaded yet.</p>
      )}
    </div>
  );
};

export default VideoFeed;
