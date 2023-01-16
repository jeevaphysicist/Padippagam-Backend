const UserData = require('../../Models/Users/Auth');
const bcrypt = require('bcryptjs');


//  Create users account
exports.Registeraccount = async (req,res)=>{
    let {FullName,Password,MobileNo,Email} =req.body;
    
    //  hashing password by using bcryptjs module
     const salt = bcrypt.genSaltSync(10);
     const hash = bcrypt.hashSync(Password, salt);
     Password = hash ;
     let UserID = Math.random().toString(36).substr(2, 4).toUpperCase();
         UserID = `SAIRUN/${UserID}`;

     const data = {
        FullName:FullName,
        Email:Email,
        Password:Password,
        MobileNo:MobileNo,
        UserID : UserID
     }
    //  console.log(data);

    // check user is exist or not 
    // if user exist its return error  or not exist give message successfully registered
     let filter = {Email:Email};
     UserData.find(filter).then(result=>{
          if(result.length > 0){
                   res.status(401).json({
                    message:"User Already exist",
                    create:false
                   })
          }
          else{
            UserData.create(data).then(output=>{
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


// first check user is exist or not
//  if exist ,next go to check the password is correct or not  
//  correct means login successfully
exports.Login = async (req,res)=>{
    let {Email,Password} = req.body ;
    let filter = { Email:Email };

    UserData.find(filter).then(result=>{
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
                const { Password ,isAdmin,Email,FullName,Photo,MobileNo,_id ,...otherdetails} = result[0]._doc;
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


// @put method
// update user account 
exports.UpdateUser = (req,res)=>{

    let query = {UserID:req.params.UserID};
    // console.log("query",query);
   let  value =  req.body ; 
    // console.log("value",value);
    let data = {$set:value};
    UserData.updateOne(query,data).then(result=>{
        res.status(201).json({
            message:"user data update successfully",
            data:result
        });
    })
    .catch(err=>{
        res.status(500).json({
            message:"something err went wrong in database",
            Error:err
        })
    })
}

// Forgot Password
// @POST Method
exports.ForgetPassword = (req,res)=>{

 //  send OTP to the Email
 //  And store the OTP in database for user verify Enter the same code are not 
//   After 5 minutes the OTP is deleted Automatically in the data base . NOTES : This is most important .
 
}

// Checking OTP is correct are not
// @POST Method
exports.CheckOTP = (req,res)=>{

    // user put the OTP and check the OTP compare user given input and database stored OTP  are same or not .

}

// Change Password
// @PUT Method
exports.ChangePassword = (req,res)=>{

    // User give A New Password and Update the Password Feild in the database 
    // And main thing is the New Password is Also hashed

}