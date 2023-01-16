const mongoose = require('mongoose');

// create user schema 
const AuthSchema = mongoose.Schema({
                   FullName:{
                    type:String,
                    required:true
                   },
                   Email:{
                    type:String,
                    required:true
                   },
                   Password:{
                    type:String,
                    required:true
                   },
                   MobileNo:{
                    type:Number,
                    required:true
                   },
                   isAdmin:{
                    type:Boolean,
                    default:false
                   },
                    Photo:{
                    type:String,
                    default:"avator"
                   },
                   UserID:{
                    type:String,
                    required:true,
                    unique:true
                   },

},{timestamps:true});

module.exports = mongoose.model("Userdata",AuthSchema,"Userdata");