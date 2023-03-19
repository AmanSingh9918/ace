const express = require("express")
const app=express()
const path=require("path")
const hbs = require ("hbs")
const collection = require("./mongodb")
const tempelatePath=path.join(__dirname,'../tempelates')

app.use(express.json())
app.set("view engine","hbs");
app.set("views",tempelatePath)
app.use(express.urlencoded({extended:false}))


app.get("/",(req,res)=>{
    res.render("index")
})
app.get("/login",(req,res)=>{
    res.render("login")
})
app.get("/signupp",(req,res)=>{
    res.render("signupp")
})
app.post("/signupp",async (req,res)=>{
 
const data={
    
    name:req.body.name,
    username:req.body.username,
    email:req.body.email,
    password:req.body.password

}
await collection.insertMany([data])

res.render("home")
})

app.post("/login",async (req,res)=>{
 
    
    try{
        const check=await collection.findOne({username:req.body.username})
        if(check.password===req.body.password){
            res.render("home")
        }
        else{
            res.send("wrong password")
        }


    }
    
    catch(err){
        res.send("wrong username")
        
       
    }
    })   
app.listen (3000,()=>{
    console.log("port connected");
})