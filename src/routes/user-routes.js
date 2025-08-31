import { Router } from "express";

import {
    getAllUsers,
    createUser,
    getUserById,
    update,
    deleteUser,
} from "../controllers/user-controllers.js";
const UserRouter = Router   ();
// Define routes for user operations
UserRouter.get("/", getAllUsers); // Get all users
UserRouter.post("/", createUser); // Create a new user
UserRouter.get("/:id", getUserById); // Get a user by ID
UserRouter.put("/:id", update); // Update a user by ID
UserRouter.delete("/:id", deleteUser); // Delete a user by ID

export default UserRouter;
