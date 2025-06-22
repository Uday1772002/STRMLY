import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import VideoUpload from "./components/video/VideoUpload";
import VideoFeed from "./components/video/VideoFeed";
import Sidebar from "./components/common/Sidebar";
import { AuthProvider, AuthContext } from "./context/AuthContext";

const AppLayout = () => {
  const { user } = React.useContext(AuthContext);

  if (!user) {
    // Render login/signup outside of sidebar/app layout
    return (
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/feed" element={<VideoFeed />} />
          <Route path="/upload" element={<VideoUpload />} />
          <Route path="/videos" element={<div>Videos Page</div>} />
          <Route path="/search" element={<div>Search Page</div>} />
          <Route path="/profile" element={<div>Profile Page</div>} />
          <Route path="*" element={<Navigate to="/feed" />} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppLayout />
      </Router>
    </AuthProvider>
  );
}

export default App;
