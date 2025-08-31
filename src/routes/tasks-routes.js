import { Router } from "express";  

import 
{   getAllTasks, 
    createTask, 
    getTaskById, 
    updateTask, 
    deleteTask ,

} from "../controllers/tasks-controllers.js";  

const RouterTask = Router();
// Define routes for task operations
RouterTask.get("/", getAllTasks); // Get all tasks
RouterTask.post("/", createTask); // Create a new task
RouterTask.get("/:id", getTaskById); // Get a task by ID
RouterTask.put("/:id", updateTask); // Update a task by ID
RouterTask.delete("/:id", deleteTask); // Delete a task by ID

export default RouterTask;