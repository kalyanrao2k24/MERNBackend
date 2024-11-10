const express=require("express")

let router=express.Router()

let env=require("dotenv")
env.config()


let jwt=require("jsonwebtoken")
let mongoose=require("mongoose")

let User=require("../Models/UserModel")

    mongoose.connect(process.env.MongodbUrl,)
    .then(() => {
      console.log('User db Connected');
    })
    .catch((err) => {
      console.error('User Failed to connect to MongoDB ', err);
    });

router.get(`/login/:userName/:password`,async(req,res)=>{
        
        const {userName,password}=req.params
        let userData=await User.find({email:userName})
        if(!userData.length){
          res.status(400).send("Invalid User name or Password")
        }
        else if(userData[0].password===password){
          let jwtToken=jwt.sign(userName,process.env.secretKey)
          res.status(200).send({jwtToken:jwtToken})
        }
        else{
          res.status(400).send("Invalid User name or Password")
        }


})


router.get(`/getUserDetails/:token`,async(req,res)=>{
        
  const {token}=req.params
  let userEmail=jwt.verify(token,process.env.secretKey)
  let userData=await User.find({email:userEmail})
  if(userData.length){
    res.status(200).send(userData[0])
  }
else{
    res.status(400).send("Invalid User name or Password")
  }


})




module.exports=router;