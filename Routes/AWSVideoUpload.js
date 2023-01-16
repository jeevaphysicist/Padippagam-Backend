const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const shortid = require("shortid");
const dotenv = require('dotenv');

// config env file
dotenv.config();

// create router 
const router = express.Router(); 

const s3 = new AWS.S3({
    accessKeyId: process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSSecretKey
})

const storage = multer.memoryStorage({
    destination: function(req, file, callback) {
        callback(null, '')
    }
})

const upload = multer({storage}).single('file');


// @ POST method
// upload  file 
router.post('/image' ,upload,(req, res) => {

    let myFile = req.file.originalname.split(".")
    const fileType = myFile[myFile.length - 1]
    console.log("file",req.file);

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${shortid.generate()}.${fileType}`,
        Body: req.file.buffer
    }

    s3.upload(params, (error, data) => {
        if(error){
            res.status(500).send(error)
        }

        console.log("data",data);
        res.status(200).json({
            data
        })
    })
}) ;


// export route
module.exports = router ;