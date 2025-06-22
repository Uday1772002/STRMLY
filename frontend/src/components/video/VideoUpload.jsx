import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./VideoUpload.css";
import { FaUpload, FaVideo } from "react-icons/fa";

const VideoUpload = () => {
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [videoType, setVideoType] = useState("short");
  const [genre, setGenre] = useState("");
  const [ageRestriction, setAgeRestriction] = useState("all");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [visibility, setVisibility] = useState("public");
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "video/mp4": [".mp4"],
      "video/mov": [".mov"],
      "video/avi": [".avi"],
    },
    multiple: false,
  });

  const genreOptions = [
    "Education",
    "Entertainment",
    "Technology",
    "Business",
    "Lifestyle",
    "Sports",
    "Music",
    "Cooking",
    "Travel",
    "Fitness",
    "Gaming",
    "News",
  ];

  const handleNext = () => {
    if (step === 1) {
      if (files.length > 0) {
        setStep(2);
      } else {
        setError("Please select a video file to upload.");
      }
    } else if (step === 2) {
      if (!title.trim()) {
        setError("Title is required.");
        return;
      }
      setStep(3);
    } else if (step === 3) {
      if (!genre) {
        setError("Genre is required.");
        return;
      }
      setStep(4);
    }
  };

  const handleBack = () => {
    setError(null);
    setStep(step - 1);
  };

  const handleTagAdd = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleTagAdd();
    }
  };

  const handleTagRemove = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) {
      setError("No file selected.");
      return;
    }
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("video", files[0]);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("videoType", videoType);
    formData.append("genre", genre);
    formData.append("ageRestriction", ageRestriction);
    formData.append("tags", JSON.stringify(tags));
    formData.append("visibility", visibility);

    try {
      await api.post("/videos/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/feed");
    } catch (err) {
      setError(
        err.response?.data?.message || "Upload failed. Please try again."
      );
      setLoading(false);
    }
  };

  const handleRemoveFile = () => {
    setFiles([]);
  };

  const renderStepOne = () => (
    <div className="upload-step-one">
      <div className="upload-tabs">
        <button
          className={`tab-button${videoType === "short" ? " active" : ""}`}
          onClick={() => setVideoType("short")}
        >
          Short Video
        </button>
        <button
          className={`tab-button${videoType === "long" ? " active" : ""}`}
          onClick={() => setVideoType("long")}
        >
          Long Video
        </button>
      </div>
      <div
        {...getRootProps({
          className: `dropzone ${isDragActive ? "active" : ""}`,
        })}
      >
        <input {...getInputProps()} />
        {files.length === 0 ? (
          <>
            <FaUpload className="dropzone-icon" />
            <p>Upload your {videoType} video</p>
            <span>Drag and drop or click to browse</span>
            {videoType === "short" ? (
              <em>Max duration: 60 seconds</em>
            ) : (
              <em>Supports MP4, MOV, AVI up to 2GB</em>
            )}
            <button type="button" className="choose-file-btn">
              Choose File
            </button>
          </>
        ) : (
          <div className="file-preview">
            <FaVideo
              className="file-preview-icon"
              style={{
                fontSize: "3rem",
                color: "#e53935",
                marginBottom: "1rem",
              }}
            />
            <div>{files[0].name}</div>
            <div style={{ color: "#aaa", marginBottom: "1rem" }}>
              {(files[0].size / (1024 * 1024)).toFixed(2)} MB
            </div>
            <button
              type="button"
              className="remove-file-btn"
              onClick={handleRemoveFile}
            >
              &times; Remove
            </button>
          </div>
        )}
      </div>
      <div className="form-actions">
        <button
          onClick={handleNext}
          className="next-btn"
          disabled={files.length === 0}
        >
          Next
        </button>
      </div>
    </div>
  );

  const renderStepTwo = () => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleNext();
      }}
      className="upload-step-two"
    >
      <h3>Details</h3>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter video title"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Tell viewers about your video"
        />
      </div>
      <div className="form-actions">
        <button type="button" onClick={handleBack} className="back-btn">
          Back
        </button>
        <button type="submit" className="next-btn">
          Next
        </button>
      </div>
    </form>
  );

  const renderStepThree = () => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleNext();
      }}
      className="upload-step-three"
    >
      <h3>Content Classification</h3>
      <div className="form-group">
        <label htmlFor="genre">Genre *</label>
        <select
          id="genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
        >
          <option value="">Select video genre</option>
          {genreOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Age Restriction *</label>
        <div className="age-restriction-group">
          <label
            className={`age-radio${
              ageRestriction === "all" ? " selected" : ""
            }`}
          >
            <input
              type="radio"
              name="ageRestriction"
              value="all"
              checked={ageRestriction === "all"}
              onChange={() => setAgeRestriction("all")}
            />
            <span className="age-radio-custom"></span>
            <span>
              <strong>All Ages</strong>
              <div className="age-desc">Suitable for everyone</div>
            </span>
          </label>
          <label
            className={`age-radio${ageRestriction === "13" ? " selected" : ""}`}
          >
            <input
              type="radio"
              name="ageRestriction"
              value="13"
              checked={ageRestriction === "13"}
              onChange={() => setAgeRestriction("13")}
            />
            <span className="age-radio-custom"></span>
            <span>
              <strong>13+</strong>
              <div className="age-desc">
                May not be suitable for children under 13
              </div>
            </span>
          </label>
          <label
            className={`age-radio${ageRestriction === "16" ? " selected" : ""}`}
          >
            <input
              type="radio"
              name="ageRestriction"
              value="16"
              checked={ageRestriction === "16"}
              onChange={() => setAgeRestriction("16")}
            />
            <span className="age-radio-custom"></span>
            <span>
              <strong>16+</strong>
              <div className="age-desc">
                May not be suitable for children under 16
              </div>
            </span>
          </label>
          <label
            className={`age-radio${ageRestriction === "18" ? " selected" : ""}`}
          >
            <input
              type="radio"
              name="ageRestriction"
              value="18"
              checked={ageRestriction === "18"}
              onChange={() => setAgeRestriction("18")}
            />
            <span className="age-radio-custom"></span>
            <span>
              <strong>18+</strong>
              <div className="age-desc">Adults only</div>
            </span>
          </label>
        </div>
      </div>
      <div className="form-actions">
        <button type="button" onClick={handleBack} className="back-btn">
          Back
        </button>
        <button type="submit" className="next-btn">
          Next
        </button>
      </div>
    </form>
  );

  const renderStepFour = () => (
    <form onSubmit={handleSubmit} className="upload-step-four">
      <div className="upload-final-grid">
        <div className="upload-final-left">
          <h3>Tags & Discovery</h3>
          <div className="form-group">
            <label htmlFor="tags">Tags *</label>
            <div className="tags-input-wrapper">
              <input
                id="tags"
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder="Add tags to help people discover your video"
              />
              <button
                type="button"
                className="add-tag-btn"
                onClick={handleTagAdd}
              >
                Add
              </button>
            </div>
            <div className="tags-list">
              {tags.map((tag) => (
                <span key={tag} className="tag-chip">
                  {tag}{" "}
                  <span
                    className="remove-tag"
                    onClick={() => handleTagRemove(tag)}
                  >
                    &times;
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="upload-final-right">
          <h3>Privacy & Publishing</h3>
          <div className="form-group">
            <label>Visibility</label>
            <div className="age-restriction-group">
              <label
                className={`age-radio${
                  visibility === "public" ? " selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="visibility"
                  value="public"
                  checked={visibility === "public"}
                  onChange={() => setVisibility("public")}
                />
                <span className="age-radio-custom"></span>
                <span>
                  <strong>Public</strong>
                  <div className="age-desc">Anyone can search for and view</div>
                </span>
              </label>
              <label
                className={`age-radio${
                  visibility === "unlisted" ? " selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="visibility"
                  value="unlisted"
                  checked={visibility === "unlisted"}
                  onChange={() => setVisibility("unlisted")}
                />
                <span className="age-radio-custom"></span>
                <span>
                  <strong>Unlisted</strong>
                  <div className="age-desc">Anyone with the link can view</div>
                </span>
              </label>
              <label
                className={`age-radio${
                  visibility === "private" ? " selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="visibility"
                  value="private"
                  checked={visibility === "private"}
                  onChange={() => setVisibility("private")}
                />
                <span className="age-radio-custom"></span>
                <span>
                  <strong>Private</strong>
                  <div className="age-desc">Only you can view</div>
                </span>
              </label>
            </div>
          </div>
          <h3>Upload Summary</h3>
          <div className="upload-summary">
            <div>
              <strong>Title:</strong> {title}
            </div>
            <div>
              <strong>Type:</strong>{" "}
              {videoType === "short" ? "Short Video" : "Long Video"}
            </div>
            <div>
              <strong>Access:</strong> Free
            </div>
            <div>
              <strong>Genre:</strong> {genre}
            </div>
            <div>
              <strong>Age Rating:</strong> {ageRestriction}
            </div>
            <div>
              <strong>Tags:</strong> {tags.join(", ")}
            </div>
            <div>
              <strong>Visibility:</strong> {visibility}
            </div>
          </div>
        </div>
      </div>
      <div className="form-actions">
        <button type="button" onClick={handleBack} className="back-btn">
          Back
        </button>
        <button type="submit" className="upload-btn" disabled={loading}>
          {loading ? "Publishing..." : "Publish Video"}
        </button>
      </div>
    </form>
  );

  return (
    <div className="upload-page">
      <h1>Upload Video</h1>
      <div className="upload-container">
        <div className="upload-box">
          <h2>Upload Your Video</h2>
          {error && <p className="error-message">{error}</p>}
          {step === 1 && renderStepOne()}
          {step === 2 && renderStepTwo()}
          {step === 3 && renderStepThree()}
          {step === 4 && renderStepFour()}
        </div>
      </div>
    </div>
  );
};

export default VideoUpload;
