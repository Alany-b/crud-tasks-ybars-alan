import sequelize from "../config/database.js";
import Task from "../models/tasks-models.js";
import { Op } from "sequelize";
// Get all tasks
export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving tasks", error });
    }
};
// Create a new task
export const createTask = async (req, res) => {
    const { title, description } = req.body;
    try {
        const newTask = await Task.create({ title, description });
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: "Error creating task", error });
    }
}
// Get a task by ID
export const getTaskById = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findByPk(id);
        if (task) {
            res.status(200).json(task);
        } else {
            res.status(404).json({ message: "Task not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error retrieving task", error });
    }
}
// Update a task by ID
export const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    try {
        const [updated] = await Task.update(
            { title, description, completed },
            { where: { id } }
        );
        if (updated) {
            const updatedTask = await Task.findByPk(id);
            res.status(200).json(updatedTask);
        } else {
            res.status(404).json({ message: "Task not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating task", error });
    }
}
// Delete a task by ID
export const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Task.destroy({ where: { id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "Task not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting task", error });
    }
}






