const express = require('express');
const {Registeraccount,Login,UpdateUser} = require('../../Controllers/Users/Auth');

// create router 
const router = express.Router(); 

// @ POST method
// users account registeration
router.post('/Registeraccount',Registeraccount);

// @ POST method
// users account login
router.post('/Loginaccount',Login);

// @ POST method
// users account Update data
router.post('/Updateaccount',UpdateUser);




// export route
module.exports = router ;