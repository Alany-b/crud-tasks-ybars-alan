import { Router } from "express";

import {
    getAllUsers,
    createUser,
    getUserById,
    update,
    deleteUser,
} from "../controllers/user-controllers.js";
const router = Router();
// Define routes for user operations
router.get("/", getAllUsers); // Get all users
router.post("/", createUser); // Create a new user
router.get("/:id", getUserById); // Get a user by ID
router.put("/:id", update); // Update a user by ID
router.delete("/:id", deleteUser); // Delete a user by ID

export default router;
// This file defines the routes for user operations in the application.
// It uses Express Router to handle HTTP requests for creating, reading, updating, and deleting users
