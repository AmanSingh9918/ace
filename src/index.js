const express = require("express")
const app=express()
const path=require("path")
const hbs = require ("hbs")
const collection = require("./mongodb")
const tempelatePath=path.join(__dirname,'../tempelates')
app.use(express.static(__dirname+ '../public'));

app.use(express.json());
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
app.get("/electricity",(req,res)=>{
    res.render("electricity")
})
app.get("/home",(req,res)=>{
    res.render("home")
})
app.get("/cable",(req,res)=>{
    res.render("cable")
})
app.get("/creditcard",(req,res)=>{
    res.render("creditcard")
})
app.get("/gasbill",(req,res)=>{
    res.render("gasbill")
})
app.get("/waterbill",(req,res)=>{
    res.render("waterbill")
})
app.get("/about",(req,res)=>{
    res.render("about")
})
app.get("/mobile",(req,res)=>{
    res.render("mobile")
})
app.get("/homerent",(req,res)=>{
    res.render("homerent")
})

app.post("/signupp",async (req,res)=>{
 
const data={
    
    name:req.body.name,
    username:req.body.username,
    email:req.body.email,
    password:req.body.password
}
    try{
        const check=await collection.findOne({email:req.body.email})
        if(check.email===req.body.email){
            res.send("email occupied")
        }
        else{
            res.render("login")
        }


    }
    
    catch(err){
        comsole.log(err)
        
       
    }
await collection.insertMany([data])
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