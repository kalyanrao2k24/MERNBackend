const express=require("express")

let router=express.Router()

let env=require("dotenv")
env.config()


let jwt=require("jsonwebtoken")
let mongoose=require("mongoose")


const Employee = require("../Models/EmployeeModel")

mongoose.connect(process.env.MongodbUrl,)
    .then(() => {
      console.log('Employee Connected to MongoDB successfully! ');
    })
    .catch((err) => {
      console.error('Employee Failed to connect to MongoDB', err);
    });

router.post("/addEmployee",async(req,res)=>{
    const {employeeData}=req.body

   let { empCourse,
    empName ,
    empDesignation,
    empEmail,
    empImage,
    empGender,
    empMobile}=employeeData
    let employee= await Employee.find({empEmail:empEmail})
    if(employee.length){
        res.status(400).send("User already exist with mail address")
    }
    else{
        let result= await Employee({empEmail:empEmail,empName,empCourse:empCourse[0],empDesignation,empMobile,empImage,empGender})
        result.save()
        res.status(200).send("User Data uploaded successfully")
      
    }
    
});



router.get("/getEmployeeList",async(req,res)=>{
    let employee= await Employee.find()
    if(employee.length){
        res.status(200).send(employee)
    }
    else{
        res.status(400).send("No employee list found")
      
    }
    
})

router.get("/getEmployeeList/:id",async(req,res)=>{
    let {id}=req.params
    let employee= await Employee.find({_id:id})
    if(employee.length){
        res.status(200).send(employee)
    }
    else{
        res.status(400).send("No employee  found")
      
    }
    
})



router.delete(`/deleteEmployee/:id`,async(req,res)=>{
    const {id}=req.params
    let employee= await Employee.find({_id:id})
    if(employee.length){
        await Employee.deleteOne({_id:id})

        res.status(200).send("User Deleted successfully")
    }
    else{
        
        res.status(400).send("Error occured")
      
    }
    
});




router.put("/updateEmployee",async(req,res)=>{

    const {employeeData}=req.body
   let {id, empCourse,
    empName ,
    empDesignation,
    empEmail,
    empImage,
    empGender,
    PreEmail,
    empMobile}=employeeData

    let employee= await Employee.find({_id:id})

    if(employee.length){
        if(empEmail!==PreEmail){
            let checkEmp = await Employee.find({empEmail:empEmail})
            if(checkEmp.length){
                res.status(400).send("User already exist with the mail address")
            }
            else{
                const result = await Employee.updateOne(
                { _id:id}, 
                { $set: {empCourse:empCourse[0],
                    empName ,
                    empDesignation,
                    empEmail,
                    empImage,
                    empGender,
                    PreEmail,
                    empMobile  } } 
              )
              if (result.modifiedCount === 1) {
                res.status(200).send("User Data updated successfully ")
              } else {
                res.status(400).send("User Data not updated")
              }
            }
        }
        else{
            const result = await Employee.updateOne(
            { _id:id}, 
            { $set: {empCourse:empCourse[0],
                empName ,
                empDesignation,
                empEmail,
                empImage,
                empGender,
                PreEmail,
                empMobile  } } 
          )
          if (result.modifiedCount === 1) {
            res.status(200).send("User Data updated successfully ")
          } else {
            res.status(400).send("User Data not updated")
          }
        }
        
    }
    else{
       res.status(400).send("User not exist with mail address")
    }
    
});



module.exports=router