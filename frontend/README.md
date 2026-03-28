# Golf Score Tracker

A full-stack web application for tracking golf scores, statistics, and performance analytics.

Live App: https://golf-score-tracker-xcvy.onrender.com

## Features

- User authentication (register/login)
- Log golf rounds with detailed stats (score, FIR, GIR, putts)
- View round history
- Performance analytics and trends
- Show for multiple golf courses

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, Axios |
| Backend | Node.js, Express |
| Database | MongoDB Atlas |
| Hosting | Render (Frontend + Backend) |

## Installation

1. Clone the repository:

    git clone https://github.com/isabeau4iu/golf-score-tracker.git
    cd golf-score-tracker

2. Create backend/.env:

    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    PORT=8000

3. Create frontend/.env:

    REACT_APP_API_URL=http://localhost:8000/api

4. Install and run:

    cd backend && npm install && npm start
    cd ../frontend && npm install && npm start

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |
| GET | /api/courses | Get all courses |
| GET | /api/rounds | Get user rounds |
| POST | /api/rounds | Log new round |

