const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Todo = require("./TodoSchema")
const PORT = 8001;

app.use(express.json());

app.post("/todo", (req, res)=>{
   
try{
 const todoObj = new Todo({
        task :req.body.task,
        isCompleted: req.body.isCompleted,
    });

    todoObj.save();

    res.status(200).send("New Todo is created");
}
catch(err){
res.status(500).send("internal sever error");
}
   
});


mongoose
  .connect(
    "mongodb+srv://komal:komalmeena6516@cluster0.r2u1ebk.mongodb.net/todoApp?retryWrites=true&w=majority"
  )
  .then(() => console.log("mongoDB is connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log("Server si running at", PORT);
});
