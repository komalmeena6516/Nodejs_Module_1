

// es6 import express from 'express'


// es5 
 const express = require("express");
 const app = express();

 app.listen(8001, ()=>{
    console.log("your server is running at port 8001");
 })

 app.get("/test", (req, res)=>{
    return res.send("server is running!! yayy!!!");
 })