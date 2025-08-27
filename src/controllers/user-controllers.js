import sequelize from "../config/database.js";
import user from "../models/user-models.js";
import { Op } from "sequelize";

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await user.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "No existen los usuarios", error });
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
         const { name, email, password } = req.body;
    if (
      name === "" ||
      name === undefined ||
      email === "" ||
      email === undefined ||
      password === "" ||
      password === undefined
    )
      return res
        .status(400)
        .json({ message: "Los campos no deben estar vacios" });

    if (name.length > 100)
      return res
        .status(400)
        .json({ message: "El nombre no debe tener más de 100 caracteres" });

    if (email.length > 100)
      return res
        .status(400)
        .json({ message: "El email no debe tener más de 100 caracteres" });

    const emailExiste = await User.findOne({
      where: { email: email, id: { [Op.ne]: req.params.id } },
    });
    if (emailExiste)
      return res.status(400).json({ message: "Ya existe el email" });

    if (password.length > 100)
      return res
        .status(400)
        .json({ message: "El password no debe tener más de 100 caracteres" });

    const [update] = await User.update(req.body, {
      where: { id: req.params.id },
    });
    if (update) {
      const actualizarUser = await User.findByPk(req.params.id);
      return res.status(200).json(actualizarUser);
    } else {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Delete a user by ID
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
          const eliminarUsusario = await User.destroy({
      where: { id: req.params.id },
    });
    if (!eliminarUsusario)
      return res.status(404).json({ message: "El usuario no existe" });
    return res.status(200).json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};