const express=require("express")
let cors=require("cors")

let dotenv=require("dotenv")
dotenv.config()


let port=process.env.PORT || 3600

const app=express()

app.use(express.json())
app.use(cors())



let UserRoute=require("./Routes/UserRoute")
app.use("/user",UserRoute)


let EmployeeRouter=require("./Routes/EmployeeRouter")
app.use("/employee",EmployeeRouter)

app.listen(3500,(err)=>{
    if(err){
        console.log(`Server not connected`)
    }
    else{
        console.log(`server conected at  port ${port}`)
    }
    
})