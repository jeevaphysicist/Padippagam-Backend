const JsonAuthentication = require('../../Models/Courses/JSONAuth');
const bcrypt = require('bcryptjs');

// upload JSON User login crediational
exports.Registeraccount = async (req,res)=>{
    let {FullName,Password,Photo,Email} =req.body;
    
    //  hashing password by using bcryptjs module
     const salt = bcrypt.genSaltSync(10);
     const hash = bcrypt.hashSync(Password, salt);
     Password = hash ;
     let ID = Math.random().toString(36).substr(2, 4).toUpperCase();
         ID = `SAIRUN/JSON${ID}`;

     const data = {
        FullName:FullName,
        Email:Email,
        Password:Password,
        ID : ID,
        Photo:Photo
     }
    //  console.log(data);

    // check user is exist or not 
    // if user exist its return error  or not exist give message successfully registered
     let filter = {Email:Email};
     JsonAuthentication.find(filter).then(result=>{
          if(result.length > 0){
                   res.status(401).json({
                    message:"User Already exist",
                    create:false
                   })
          }
          else{
            JsonAuthentication.create(data).then(output=>{
                res.status(201).json({
                    message:"Successfully registered",
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

// Json User login
exports.Login = async (req,res)=>{
    let {Email,Password} = req.body ;
    let filter = { Email:Email };

    JsonAuthentication.find(filter).then(result=>{
        if(result.length == 0){
            res.status(403).json({
                message:"Invalid Email ID",
                isloggedin:false
            })

        }
        else{
            // check hashing password and user password is correct or not 
            // if it matches , reso is true otherwise reso is false
             bcrypt.compare(Password, result[0].Password,(err,reso)=>{
                const { Password , _id, Photo ,createdAt , updatedAt ,__v  ,...otherdetails} = result[0]._doc;
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
                        message:"Invalid Password",
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