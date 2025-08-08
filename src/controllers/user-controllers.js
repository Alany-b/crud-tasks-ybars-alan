import sequelize from "../config/database.js";
import user from "../models/user-models.js";
import { Op } from "sequelize";

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await user.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving users", error });
    }
};
// Create a new user
export const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const newUser = await user.create({ name, email, password });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
}
// Get a user by ID
export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const userData = await user.findByPk(id);
        if (userData) {
            res.status(200).json(userData);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error retrieving user", error });
    }
}
// Update a user by ID
export const update = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    try {
        const [updated] = await user.update(
            { name, email, password },
            { where: { id } }
        );
        if (updated) {
            const updatedUser = await user.findByPk(id);
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }
}
// Delete a user by ID
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await user.destroy({ where: { id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error });
    }
}