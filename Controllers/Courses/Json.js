const JSONFile = require('../../Models/Courses/Json');

// upload Topics data 
exports.UploadContent = async (req,res)=>{

let data  =  req.body ;
let count = await JSONFile.find({Topic:req.body.Topic,CourseID:req.body.CourseID}).count();

if(count == 0)
JSONFile.create(data).then( result=>{

        res.status(201).json({ message:"Data Fetched successfully from Database" , data:result , upload:true });
                         
}).catch(error=>{

    res.status(500).json({ message:"Database Error", error:error , upload:false });

});

else  res.status(200).json({ message:"Sorry You Already Upload This data" , upload:false });
               
}

// get Topics data
exports.getTopicData = (req,res)=>{
       
    let filter= req.body ; 
    JSONFile.find(filter).then(result=>{

         if(result.length > 0 )
         {
            res.status(200).json({ message :"Data Fetched Successfully From Database" , data:result });
         }
         else{
            res.status(201).json({ message:"That Topic Data is not uploaded"});
         }

    }).catch(error=>{

          res.status(500).json({ message:"Database Errro" , error:error });       

    })
}

// Get All Topics by courseID
exports.getAllTopics = async (req,res)=>{
     let filter = {CourseID:req.body.CourseID};
   //   console.log("filter",filter)
     let data =  await JSONFile.find(filter);
     let Topics = [];
    //  console.log(data);
     for(let i=0 ;i<data.length;i++){
        let value = data[i].Topic;
        Topics.push(value);
     }
     if(Topics.length > 0 )
     res.status(200).json({ message:"GetAllTopics" , data:Topics })
     else
     res.status(201).json({ message:"No Data" })
}

// upload Topics data 
exports.UpdateContent = async (req,res)=>{

   let query={ Topic:req.body.Topic , CourseID:req.body.CourseID };
   let data  =  req.body ;
   let count = await JSONFile.find({Topic:req.body.Topic}).count();
   
   if(count > 0)
   JSONFile.updateOne(query,data).then( result=>{
   
           res.status(201).json({ message:"Data Updated successfully " , data:result , update:true });
                            
   }).catch(error=>{
   
       res.status(500).json({ message:"Database Error", error:error , update:false });
   
   });
   
   else  res.status(200).json({ message:"Sorry No Existing  data" , update:false });
                  
   }
