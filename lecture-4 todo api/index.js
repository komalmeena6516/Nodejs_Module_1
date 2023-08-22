const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 8001;

app.use(express.json());

//GET - Get a single todo
app.get("/todo/:id" , (req, res)=>{
    try{
        todoId = req.params.id;
        const fileData = JSON.parse(fs.readFileSync("./database.json").toString());
        const todosList = fileData.todos;

        let todoWithID = todosList.filter((t)=> t.id == todoId);
        res.status(200).json(todoWithID);
    }
    catch(err){
        res.status(500).json({message :err});
    }
})

//GEt = get all todo

app.get("/todo", (req, res)=>{
    try{
        const fileData = JSON.parse(fs.readFileSync("./database.json").toString());
    const todos = fileData.todos;

    res.status(200).json({data: todos})
    }
    catch(err){
res.status(500).json({message :err});
    }
    
})

//POST = create new todo todo
app.post("/todo", (req, res) => {
  try {
    const newTodo = req.body;
    const fileData = JSON.parse(fs.readFileSync("./database.json").toString());
    fileData.todos.push(newTodo);

    fs.writeFileSync("./database.json", JSON.stringify(fileData));

    res.status(201).send("Todo is successfully created ! ");
  } catch (err) {
    res.status(500).json({ messagae: err });
  }

  // console.log(fileData.todos);
});


//PUT - update a todo

app.put("/todo/:id", (req, res)=>{
    try{
        const todoId = req.params.id;
const updatedTodobody = req.body;

        let fileData = JSON.parse(fs.readFileSync("./database.json").toString());
        let todosList = fileData.todos;

        for(let i = 0; i<todosList.length; i++){
            if(todosList[i].id == todoId){
                fileData.todos[i] = updatedTodobody;
                break;
            }
        }

        fs.writeFileSync("./database.json", JSON.stringify(fileData));

    res.status(200).send("Todo is updated successfully! ");
    }
    
    catch(err){
        res.status(500).json({message :err});
    }
})






//DELETE - delete a todo
app.delete("/todo/:id", (req, res)=>{
    try{
        const todoId = req.params.id;
        let fileData = JSON.parse(fs.readFileSync("./database.json").toString());
        let todosList = fileData.todos;

let newTodo = todosList.filter((t)=> t.id != todoId);
fileData.todos = newTodo;

fs.writeFileSync("./database.json", JSON.stringify(fileData));

    res.status(200).send("Todo is successfully deleted ! ");
    }
    catch(err){
        res.status(500).json({message :err});
    }
})



app.listen(PORT, () => {
  console.log("server is running at ", PORT);
});
