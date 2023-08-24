const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Todo = require("./TodoSchema");
const { LoggerMiddleware, SampleMiddleware } = require("./LoggerMiddleware");
require("dotenv").config();
const PORT = 8001;

app.use(express.json());

// Logger middleware-
app.use(LoggerMiddleware);
app.use(SampleMiddleware);

// --------------------all qeries of mongoose---------------------------

// GET - fetch all data todos

app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find({});
    res.status(200).json(todos);
  } catch (e) {
    res.status(500).send("Internal sever error");
  }
});

// get - fetct one singel todo based on i
app.get("/todo/:id", async (req, res) => {
  try {
    const todoId = req.params.id;
    const todoObj = await Todo.findById(todoId);
    res.status(200).json(todoObj);
  } catch (e) {
    res.status(500).send("Internal sever error");
  }
});

// delete - delte one sigle todo using id
app.delete("/todo/:id", async (req, res) => {
  try {
    const todoId = req.params.id;
    await Todo.findByIdAndUpdate(todoId);
    res.status(200).send("todo is deleted successfully");
  } catch (e) {
    res.status(500).send("Internal sever error");
  }
});

//  put - update todo on the based of id
app.put("/todo", async (req, res) => {
  try {
    const updatedTodoData = req.body;
    await Todo.findByIdAndUpdate(updatedTodoData.id, {
      isCompleted: updatedTodoData.isCompleted,
    });
    res.status(200).send("Todo is succesfully updated");
  } catch (e) {
    res.status(500).send("Internal sever error");
  }
});
// -----------------------------------------
app.post("/todo", (req, res) => {
  try {
    const todoObj = new Todo({
      task: req.body.task,
      isCompleted: req.body.isCompleted,
    });

    todoObj.save();

    res.status(200).send("New Todo is created");
  } catch (err) {
    res.status(500).send("internal sever error");
  }
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("mongoDB is connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log("Server si running at", PORT);
});
