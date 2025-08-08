import { Router } from "express";  

import 
{   getAllTasks, 
    createTask, 
    getTaskById, 
    updateTask, 
    deleteTask ,

} from "../controllers/tasks-controllers.js";  

const router = Router();
// Define routes for task operations
router.get("/", getAllTasks); // Get all tasks
router.post("/", createTask); // Create a new task
router.get("/:id", getTaskById); // Get a task by ID
router.put("/:id", updateTask); // Update a task by ID
router.delete("/:id", deleteTask); // Delete a task by ID

export default router;