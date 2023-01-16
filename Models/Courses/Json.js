const mongoose = require('mongoose');

const JSONShema = mongoose.Schema({
                 CourseName:{
                    type:String,
                    required:true
                 },
                 CourseID:{
                     type:String,
                     required:true
                    },

                   Topic:{
                      type:String,
                      required:true
                    },

                    Definition:{
                        type:String,
                    },

                    SubHeading:{
                         type:String
                    },

                    DefinitonPoints:{
                         type:Array
                    },

                    Syntax:{
                        type:String
                    },

                    SyntaxPoints:{
                        type:Array
                    },

                    ExamplePoints:{
                        type:Array
                    },

                    ExamplePhotos:{
                        type:Array
                    },

                    OutputPoints:{
                        type:Array
                    },

                    OutputPhotos:{
                        type:Array
                    },

                    ExampleExplainationPoints:{
                        type:Array
                    },

                    Notes:{
                        type:Array
                    },

                    Video:{
                        type:Object
                    }
},{timestamps:true});

module.exports = mongoose.model("JSONFile",JSONShema,"JSONFile")