const express=require('express');
const cors=require("cors");
const app=express();
app.use(cors());
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("backend is running");
});
const connectDB=require("./db");
app.get("/test-db",async(req,res)=>{
    const conn=await connectDB();
    res.send("DB connection successful");
});
app.listen(5000,()=>{
    console.log("server running on port 5000");
});