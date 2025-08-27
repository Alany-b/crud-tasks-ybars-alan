 import sequelize from "../config/database.js";
import Task from "../models/tasks-models.js";
import User from "../models/user-models.js";
import { Op } from "sequelize";


// Create a new task
export const createTask = async (req, res) => {
    const { title, description, is_complete, user_id } = req.body;
    
    try {
if (
    title === "" ||
    title === undefined ||
    description === "" ||
    description === undefined
   ) 
   return res.status(400).json({ message: "Title y description no deben estar vacios",});
         

        if (!user_id)
      return res
        .status(400)
        .json({ message: "Se le debe asignar un usuario a la tarea" });

    const usuario = await User.findByPk(user_id);
    if (!usuario) {
      return res.status(404).json({
        message: "El usuario no existe",
      });
    }

    if (title.length > 100)
      return res
        .status(400)
        .json({ message: "El title no debe tener más de 100 caracteres" });

    if (description.length > 100)
      return res.status(400).json({
        message: "La description no debe tener más de 100 caracteres",
      });

    const tareaExiste = await Task.findOne({ where: { title: title } });
    if (tareaExiste)
      return res.status(400).json({ message: "La tarea ya existe" });

    if (typeof is_complete !== "boolean")
      return res
        .status(400)
        .json({ message: "isComplete debe ser un booleano" });

    const crearTarea = await Task.create(req.body);
    return res.status(201).json(crearTarea);


    } catch (error) {
        req.status(500).json({ message: "Error creando task", error });
    }
}
// Get all tasks
export const getAllTasks = async (req, res) => {
    try {
    //const tasks= await Task.findAll();
    const tasks = await Task.findAll({
      attributes: {
        exclude: ["user_id"],
      },
      include: [{ model: User, attributes: { exclude: ["password"] } }],
    });
    if (tasks.length == 0) return res.json({ message: "No existen tareas" });
    return res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a task by ID
export const getTaskById = async (req, res) => {
   try {
      const task = await Task.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: { exclude: ["password"] },
        },
      ],
    });
    if (!task) return res.status(404).json({ message: "La tarea no existe" });
    return res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a task by ID
export const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    try {
const { title, description, isComplete } = req.body;

    if (
      title === "" ||
      title === undefined ||
      title === null ||
      description === "" ||
      description === undefined ||
      description === null
    )
      return res.status(400).json({
        message: "Los campos de title y description no deben estar vacios",
      });

    const tareaExiste = await Task.findOne({
      where: { title: title, id: { [Op.ne]: req.params.id } },
    });
    if (tareaExiste)
      return res.status(400).json({ message: "La tarea ya existe" });

    if (typeof isComplete !== "boolean")
      return res
        .status(400)
        .json({ message: "isComplete debe ser un booleano" });
    const [update] = await Task.update(req.body, {
      where: { id: req.params.id },
    });
    if (update) {
      const actualizarTask = await Task.findByPk(req.params.id);
      return res.status(200).json(actualizarTask);
    } else {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a task by ID
export const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
          const eliminarTarea = await Task.destroy({
      where: { id: req.params.id },
    });
    if (!eliminarTarea)
      return res.status(404).json({ message: "El tarea no existe" });
    return res.status(200).json({ message: "Tarea eliminada" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};






