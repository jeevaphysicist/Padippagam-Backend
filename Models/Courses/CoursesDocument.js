const mongoose = require('mongoose');
const CourseDocumentSchema = mongoose.Schema({
      CourseName:{
          type:String,
          required:true
      },
      CourseID:{
          type:String,
          required:true
      },
      Content:{
          type:Array,
          required:true
      },
      TotalTopics:{
          type:Number,
          required:true
      }

},{timestamps:true});

module.exports = mongoose.model("CourseDocuments",CourseDocumentSchema,"CourseDocuments");