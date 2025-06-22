# STRMLY Clone

A mini full-stack demo replicating the core features of STRMLY:
- User signup/login (JWT auth)
- Video upload (Cloudinary + MongoDB)
- Public video feed
- Modern, minimal React UI

## Features
- **User Authentication**: Signup, login, JWT-protected profile
- **Video Upload**: Upload MP4 videos, store in Cloudinary, metadata in MongoDB
- **Public Feed**: View all uploaded videos, sorted by newest
- **Security**: Rate limiting, Helmet, input validation
- **Clean UI**: Modern, responsive React frontend

## Tech Stack
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, Multer, Cloudinary, JWT, bcrypt, Helmet
- **Frontend**: React.js (Vite), Axios, Context API, CSS Modules

## Setup Instructions

### 1. Clone the Repo
```sh
[[git clone https://github.com/YOUR-USERNAME/strmly_clone.git](https://github.com/Uday1772002/STRMLY.git)]
cd strmly_clone
```

### 2. Backend Setup

cd backend
npm install
# Create a .env file (see .env.example)
npm start



### 3. Frontend Setup

cd ../frontend
npm install
npm run dev

- Update `VITE_API_URL` in `.env` if backend runs on a different port.

## Usage
- Visit `/signup` or `/login` to create an account or log in
- Upload videos via the Upload page
- View all videos on the Feed page

## API Endpoints
- `POST /auth/signup` — Register
- `POST /auth/login` — Login
- `GET /auth/profile` — Get user info (JWT required)
- `POST /videos/upload` — Upload video (JWT required)
- `GET /videos` — Public video feed

## Security & Best Practices
- Rate limiting and Helmet for API protection
- All secrets/config in `.env` (never commit to GitHub)
- Input validation and error handling throughout

## License
MIT

---


