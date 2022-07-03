const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const cookieParser = require('cookie-parser');

const userAuth = require('./routes/userAuth')
const data = require('./routes/data')
const app = express();

app.use(cookieParser())
app.use(express.json());
app.use(cors())

app.use('/userAuth',userAuth)
app.use('/data',data)

const connect =  async () => {
    try {
        await mongoose.connect(process.env.MONGO,{autoIndex:true});
        console.log('Connected to MongoDB');
    }catch(err) {
        console.log(err);
    }
}

//middleware for last next(err)
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
  });






app.listen(3001,()=>{
    connect();
    console.log('Server is running on port 3000')
    })