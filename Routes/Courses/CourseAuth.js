const express = require('express');
const router  = express.Router();
const {CreateCredentials ,EnterCourse ,GetCourses} = require('../../Controllers/Courses/CourseAuth');

// @POST Method
// create COURSE INDIVIDUAL ENTER CREDENTIALS
router.post('/CreateCredentials',CreateCredentials);

// @POST Method
// Enter individual Course
router.post('/EnterIndividualCourse',EnterCourse);

// @GET Method
// Get course ID and Name
router.get('/GetCourses',GetCourses);

module.exports = router ; 