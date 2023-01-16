const express = require('express');
const router = express.Router();
const {UploadContent , getTopicData ,getAllTopics ,UpdateContent}  = require("../../Controllers/Courses/Json");

// @POST Method 
// Upload Content
router.post("/uploadcontent",UploadContent);

// @POST Method
// get Topic Data
router.post('/getTopicdData',getTopicData);

// @GET Method
// get all Topics
router.post('/getalltopics',getAllTopics);

// @POST Method
// Update Content
router.post('/updatecontent',UpdateContent)


module.exports = router ;