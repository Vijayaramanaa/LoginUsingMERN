const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const EmployeeModel = require("./model/Employee");

const app = express();
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/employee");

app.post("/login",(req,res)=>{
    const {email,password} = req.body;
    EmployeeModel.findOne({email : email})
    .then(user => {
        if(user){
            if(user.password === password){
                res.json("Success");
            }else{
                res.json("Invalid Password or mailID");
            }
        }
        else{
            res.json("No record exist");
        }
    })
})

app.post("/register",(req,res)=>{
    EmployeeModel.create(req.body)
    .then(employees => res.json(employees))
    .catch(err => res.json(err))
})

app.listen(3001, ()=>{
    console.log("app is running currently in port 3001")
})