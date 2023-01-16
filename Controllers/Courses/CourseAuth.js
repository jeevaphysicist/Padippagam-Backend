const CourseAuthentication = require('../../Models/Courses/CourseAuth');
const bcrypt = require('bcryptjs');

// Create course Enter Credentials
exports.CreateCredentials = (req,res)=>{
    let {SecreteKey , CourseName , CourseID} = req.body ;
        //  hashing password by using bcryptjs module
     const salt = bcrypt.genSaltSync(10);
     const hash = bcrypt.hashSync(SecreteKey, salt);
     SecreteKey = hash ; 
     const data = {
        CourseName:CourseName,
        CourseID:CourseID,
        SecreteKey : SecreteKey
     };

     // check Crendentials is exist or not 
    // if Credentials exist its return error  or not exist give message successfully registered
    let filter = {CourseName:CourseName,CourseID:CourseID};
    CourseAuthentication.find(filter).then(result=>{
         if(result.length > 0){
                  res.status(401).json({
                   message:"Course Credentials Already exist",
                   create:false
                  })
         }
         else{
           CourseAuthentication.create(data).then(output=>{
               res.status(201).json({
                   message:"Successfully Create Credentials",
                   create:true
               })

           })
           .catch(err=>{
               res.status(500).json({
                   message:"something went wront in database",
                   error:err,
                   create:false
               })
           })
         }
    })
    .catch(err=>{
       res.status(500).json({
           message:"something went wrong in database",
           error:err,
           create:false
       });
    });
}

// Check Credentials
exports.EnterCourse = async (req,res)=>{
    let {CourseID,SecreteKey,CourseName} = req.body ;
    let filter = { CourseID:CourseID ,CourseName:CourseName };

    CourseAuthentication.find(filter).then(result=>{
        if(result.length == 0){
            res.status(403).json({
                message:"Invalid Course ID",
                isloggedin:false
            })

        }
        else{
            // check hashing password and user password is correct or not 
            // if it matches , reso is true otherwise reso is false
             bcrypt.compare(SecreteKey, result[0].SecreteKey,(err,reso)=>{
                const { SecreteKey , _id , createdAt , updatedAt ,__v  ,...otherdetails} = result[0]._doc;
                if(reso)
                {
                    // const token = jwt.sign({id:result[0]._id,isAdmin:result[0].admin},process.env.JWT);
                  res.status(201).json({
                    message:"Your Credentials Are Approved",
                    data:otherdetails,
                    isloggedin:true
                  })
                }
                else{
                    res.status(403).json({
                        message:"Invalid Secrete Key",
                        isloggedin:false
                    })
                }
             });
        }
    })
    .catch(err=>{
        res.status(500).json({
            message:"something went wrong in database",
            error:err
        })
    })
}

// get course names and CourseID
exports.GetCourses = async (req,res)=>{
          let coursesdata = await CourseAuthentication.find();
          let Courses = [];
              for(let i=0 ; i < coursesdata.length ;i++){
                let value = {
                             CourseName:coursesdata[i].CourseName,
                             CourseID:coursesdata[i].CourseID,
                             id:coursesdata[i]._id
                            }
                Courses.push(value);
              }
         res.status(200).json({ message:"Get courses" , data:Courses })  ;   
}