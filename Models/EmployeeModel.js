const mongoose  = require("mongoose")



let EmployeeSchema=new mongoose.Schema({

    empName:{
        type:String,
        required:true
    },
    empEmail:{
        type:String,
        required:true
    },
    empMobile:{
        type:String,
        required:true
    },
    empDesignation:{
        type:String,
        required:true
    },
    empGender:{
        type:String,
        required:true
    },
    empCourse:{
        type:String,
        required:true
    },
    empImage:{
        type:String,
        required:true
    },
    createdAT:{
        type: Date,
        default: Date.now,
        required:true
    }



});


let Employee=mongoose.model("employee",EmployeeSchema)
module.exports=Employee;

