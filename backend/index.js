const express = require('express');
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config();
const authRoutes = require('./routes/authroutes')
app.use(express.json());

const mongourl = process.env.MONGODBURL;

mongoose.connect(mongourl).then(()=>{
    console.log('database connected');
    }).catch((err)=>{console.log('error accured', err);
    })

const port = process.env.PORT || 8000;

app.listen(port,()=>{console.log("server started on", port)})

app.use('/api', authRoutes);