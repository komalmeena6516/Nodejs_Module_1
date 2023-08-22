const express = require("express");
const app = express();

app.get("/test", (req, res)=>{
    res.status(200).json({data: {
        name:"komal",
        gender: "female",
    }})
})

app.listen(8001, ()=>{
    console.log("server is running on port 8001");
})