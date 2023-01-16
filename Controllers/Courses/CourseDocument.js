const CourseDocuments = require('../../Models/Courses/CoursesDocument');

exports.GetCourseTopics = (req,res)=>{
        let filter ={CourseID:req.body.CourseID};
       CourseDocuments.find(filter).then(result=>{
               res.status(200).json({ message:"Get Data Successfully", data:result});
       })
       .catch(error=>{
               res.status(500).json({ message:"Error in Database" , error:error});
       })
}