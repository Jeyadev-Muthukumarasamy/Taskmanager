const express = require("express");
const app = express();
const PORT = 3005;
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
app.use(cors());
app.use(express.json())

const todoList =[
    {
        id: "zkfmtlptc",
        todo: "tasksOne",
        isCompleted: false,
    },
    {
        id: "siz96hgwq",
        todo: "tasks",
        isCompleted: false
    },
    {
        id: "u3ji9m5mu",
        todo: "hi",
        isCompleted: false
    }
]
app.get("/api/todo",(req,res)=>{
    res.json(todoList)

})

// app.all("*",(req,res)=>{
//     console.log(res.json("this page does not exist"))

app.post("/api/todo",(req,res)=>{
    const {todo}= req.body
    if(!("todo" in req.body)){
        res.status(404).json({
            message:"todo not found",
        })
        return;
    }
    const newTd = {
        //id: todoList.length + 1,
        id: uuidv4(),
        todo: todo,
        isCompleted: false,
      };

      todoList.push(newTd);

      res.json(todoList);
    
    
})
// })
app.put("/api/todo",(req,res)=>{
    const {id,todo,isCompleted} = req.body;

    const isExist = todoList.find(data=>data.id===id)
    console.log(isExist)
    
    if(isExist){
        todoList.forEach((todoItem)=>{
            if(todoItem.id===id){
                todoItem.todo=todo;
                todoItem.isCompleted =isCompleted;
            }
        })
        return res.json(todoList)
    }
    res.status(404).json({
        message:"id not found",
    })
})

app.delete("/api/todo", (req, res) => {
    const { id } = req.body;
 
    const todoIndex = todoList.findIndex((item) => item.id === id);
 
    if (todoIndex !== -1) {
       todoList.splice(todoIndex, 1);
       return res.json(todoList);
    }
 
    res.status(404).json({ message: "Item does not exist" });
 });
 


app.listen(PORT,()=>{
    console.log(`server started in ${PORT}`)
})

