const mongoose = require('mongoose');
const JsonAuthSchema = mongoose.Schema({

      Email:{
             type:String,
             required:true
      },
      Password:{
                type:String,
                required:true
      },
      FullName:{
                type:String,
                required:true
      },
      ID:{
          type:String,
          required:true
      },
      Photo:{
        type:String,
       default:"Avator"
      }

},{timestamps:true});

module.exports = mongoose.model("JsonAuthentication",JsonAuthSchema,"JsonAuthentication");