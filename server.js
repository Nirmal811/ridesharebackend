const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// Include route files
const {authRouter} = require('./routes/authrouter');
// const rideRouter = require('./routes/riderouter');

// Use routes
app.use('/api/v1/auth', authRouter);
// app.use('/api/v1/addrides', rideRouter);

app.get("/",(req,res)=>
{
    res.send("Hello");
})

const mongoose = require('mongoose');

// Your MongoDB connection string
const dbURI = 'mongodb+srv://nirmal811k:3CH7ecogu65mwUMV@cluster0.sxbcj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Connection error', error));

const PORT = 8000;
app.listen(PORT, ()=>{
    console.log("server running in 8000");
})


