const express = require('express');
const router = express.Router();
const {GetCourseTopics} = require('../../Controllers/Courses/CourseDocument')
 
// get course topics
// @POST Method
router.post('/getcoursetopics',GetCourseTopics);

module.exports = router ;