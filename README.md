# Golf Score Tracker

A full-stack web application for amateur golfers to track scores, 
statistics, and performance analytics.

Live App: [https://golf-score-tracker-xcvy.onrender.com](https://golf-score-tracker-xcvy.onrender.com)

## Features

- User authentication (register / login)
- Log golf rounds with detailed stats (gross score, putts, FIR, GIR, and notes)
- View chronological round history
- Performance analytics and trends via charts
- Support for five Swiss golf courses

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React.js, Axios, Recharts |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas (via Mongoose) |
| Auth | JWT, bcryptjs |
| Hosting | Render (backend), Nginx (Docker frontend) |

## Run Locally with Docker

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/isabeau4iu/golf-score-tracker.git
   cd golf-score-tracker
   ```

2. Create a `.env` file in the `backend/` folder:
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
PORT=8000


3. Start the application:
```bash
docker compose up --build
```

4. Open your browser at **http://localhost**

5. To stop:
```bash
docker compose down
```

---

## Run Locally without Docker

### Prerequisites
- Node.js v18+
- A MongoDB Atlas account and cluster

### Backend
```bash
cd backend
npm install
# create a .env file with MONGO_URI, JWT_SECRET, PORT=8000
npm start
```

### Frontend
```bash
cd frontend
npm install
npm start
```

Frontend runs on **http://localhost:3000**, backend on **http://localhost:8000**.

## Live Access

The application is publicly hosted and can be accessed directly at:  
[https://golf-score-tracker-xcvy.onrender.com](https://golf-score-tracker-xcvy.onrender.com)


## Project Structure
golf-score-tracker/
├── backend/
│ ├── src/
│ │ ├── config/
│ │ ├── controllers/
│ │ ├── middleware/
│ │ ├── models/
│ │ ├── routes/
│ │ └── server.js
│ ├── Dockerfile
│ └── package.json
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── context/
│ │ ├── pages/
│ │ └── utils/
│ ├── Dockerfile
│ └── package.json
└── docker-compose.yml

