const express = require("express");
const todoModel = require("./schema");
const db = require("./db");
const app = express();
app.use(express.json());
/////////////////////////
app.get("/todos", (req, res) => {
    todoModel.find({}).then((result)=>{
        res.status(200)
        res.json(result)
    }).catch((err) => {
        res.send(err);
      })
});
///////////////////////////////////////////////
app.get("/todos/complete",(req,res)=>{
    todoModel.find({isCompleted:true}).then((result)=>{
        res.status(200)
        res.json(result)
    }).catch((err) => {
        res.send(err);
      })
})

/////////////////////////////
app.post("/create/todo", (req, res) => {
  const { task, description, deadline, isCompleted, priority } = req.body;
  const newTO = new todoModel({
    task,
    description,
    deadline,
    isCompleted,
    priority,
  });
  newTO
    .save()
    .then((result) => {
        res.status(201)
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

////////////////////////////////////
app.put("/update/todo/:task", (req, res) => {
    const taskin = req.params.task
    const { task, description, deadline, isCompleted, priority } = req.body;

    todoModel.findOneAndUpdate({task:taskin}, { task, description, deadline, isCompleted, priority }).then((result)=>{
        todoModel.find({task:task}).then((result2)=>{
            res.status(200);
            res.json(result2);
        }).catch((err) => {
            res.send(err);
          })
    }).catch((err) => {
        res.send(err);
      });
});

//////////////////////////////////////
app.delete("/delete/todo/:task", (req, res) => {
    const taskin = req.params.task;
    todoModel.findOneAndDelete({task:taskin}).then((result)=>{
        res.status(200);
        res.json(result);
    }).catch((err) => {
        res.send(err);
      });
});

////////////////////////////////////////////////////////////////////////
const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
