const mongoose = require('mongoose');
const CourseAuthSchema = mongoose.Schema({

      SecreteKey:{
                type:String,
                required:true
      },
      CourseName:{
                type:String,
                required:true
      },
      CourseID:{
          type:String,
          required:true
      }

},{timestamps:true});

module.exports = mongoose.model("CourseAuthentication",CourseAuthSchema,"CourseAuthentication");