const express = require('express');
const router = express.Router();
const {Registeraccount , Login} = require('../../Controllers/Courses/JsonAuth');

// Create Course Creator Account
// @POST method
router.post('/Createaccount',Registeraccount);

// Course creator Acccount
// @POST method
router.post('/login',Login)


module.exports = router;
