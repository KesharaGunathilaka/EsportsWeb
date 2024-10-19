require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const gamesRoute = require('./routes/gamesRoute');
const esportsRoute = require('./routes/esportsRoute');
const blogsRoute = require('./routes/blogsRoute');
const usersRoute = require('./routes/usersRoute');
const loginRoute = require('./routes/loginRoute');
const errorMiddleware = require('./middleware/errorMiddleware');
var cors = require('cors');

const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT || 3000
const FRONTEND = process.env.FRONTEND

var corsOptions = {
   origin: FRONTEND,
   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.use(cors(corsOptions))
app.use(express.json())
app.use(errorMiddleware);

app.use('/api/games',gamesRoute);
app.use('/api/esports',esportsRoute);
app.use('/api/blogs',blogsRoute);
app.use('/api/users',usersRoute);
app.use('/api/auth',loginRoute);

app.get('/',(req,res)=>{
    res.send('Hello Node API')
})

app.get('/blog',(req,res)=>{
    res.send('Hello bloggy')
})

mongoose.set("strictQuery",false)
mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('Connected!')
    app.listen(PORT, () =>{
        console.log(`Node API app is running on port ${PORT}`)
    });
}).catch((error) => {
    console.log('error')
});