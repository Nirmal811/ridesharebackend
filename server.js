const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// Include route files
const {authRouter} = require('./routes/authrouter');
const {secretsRouter} = require('./routes/secretsrouter');
// const rideRouter = require('./routes/riderouter');

// Use routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/secret',secretsRouter);
//app.use('/api/v1/addrides', rideRouter);

app.get("/",(req,res)=>
{
    res.send("Hello");
})

const mongoose = require('mongoose');
//const { secretsRouter } = require('./routes/secretsrouter');

// Your MongoDB connection string
const dbURI = 'mongodb+srv://nirmal811k:3CH7ecogu65mwUMV@cluster0.sxbcj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const uri = dbURI; // Ensure this is set in your Render environment variables

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000, // Increase the timeout to 10 seconds
  })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

const PORT = 8000;
app.listen(PORT, ()=>{
    console.log("server running in 8000");
})


