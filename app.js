const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');


// import routes
// User Routes
// Auth routes
const UserAuthRoutes = require('./Routes/Users/Auth');


// AWS routes
const AWSRoutes = require('./Routes/AWSVideoUpload');


// JSON routes
const JSONRoutes = require('./Routes/Courses/Json');
const JSONAuthRoutes = require('./Routes/Courses/JsonAuth');
const CourseAuthRoutes = require('./Routes/Courses/CourseAuth');
const CourseTopics = require('./Routes/Courses/CourseDocument');


// config env file
dotenv.config();

// Port No for server connection
const PORT = 8080;

// Database connection 
mongoose.connect(process.env.MONGOURI,()=>console.log("database connected successfully"),err=>console.log("database connection error",err));

mongoose.connection.on("connected",()=>{
    console.log("mongodb connected")
})
mongoose.connection.on("disconnected",()=>{
    console.log("mongodb disconnected")
})

// server created
const app = express();

app.get("/",(req,res)=>{
     res.send("Backend Successfully Working second commit !!!!! ");
})

// middlewares 
app.use(cors());
app.use(bodyParser.json({limit:"4GB"}));


// Routes
// Users 
// Auth path
app.use("/api/auth",UserAuthRoutes);

// AWS path
app.use('/api/AWS',AWSRoutes);

// Courses Routes start 
// JSON path
// control course document
app.use('/api/json',JSONRoutes);
// Json Auth
app.use('/api/JsonAuth',JSONAuthRoutes);
// Enter individual course
app.use('/api/CourseAuth',CourseAuthRoutes);
// course Topics
app.use('/api/CourseTopics',CourseTopics);
// Courses Routes End 

// listening server 
app.listen(PORT,()=>{
    console.log('server running on the port',PORT);
});






