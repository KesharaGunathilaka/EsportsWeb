require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

const gamesRoute = require('./routes/gamesRoute');
const esportsRoute = require('./routes/esportsRoute');
const blogsRoute = require('./routes/blogsRoute');
const usersRoute = require('./routes/usersRoute');
const loginRoute = require('./routes/loginRoute');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 3000;
const FRONTEND = process.env.FRONTEND;

// CORS configuration
var corsOptions = {
  origin: FRONTEND,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(errorMiddleware);

// API Routes
app.use('/api/games', gamesRoute);
app.use('/api/esports', esportsRoute);
app.use('/api/blogs', blogsRoute);
app.use('/api/users', usersRoute);
app.use('/api/auth', loginRoute);

// Serve static files from the frontend build folder
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

// Catch-all route to serve index.html for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

// Database connection
mongoose.set('strictQuery', false);
mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('Connected!');
    app.listen(PORT, () => {
      console.log(`Node API app is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log('Error:', error);
  });
