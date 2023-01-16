require('dotenv/config');

const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const shortid = require("shortid");
const cors = require('cors');

const app = express()
const port = 5000

app.use(cors());
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

app.post('/image',upload,(req, res) => {

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
})

app.listen(port, () => {
    console.log(`Server is up at ${port}`)
})




// const express = require('express')
// const app = express()
// const port = 5000
// const cors = require('cors')
// const multer = require('multer')

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'images/')
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname)
//   },
// })

// const upload = multer({ storage: storage })

// app.use(cors())

// app.post('/image', upload.single('file'), function (req, res) {
//   res.json({})
// })

// app.listen(port, () => {
//   console.log(`listening at http://localhost:${port}`)
// })