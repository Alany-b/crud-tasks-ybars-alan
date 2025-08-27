import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./user-models.js";


const Task = sequelize.define("task", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        },
    description: {
        type: DataTypes.STRING(100),
        allowNull: false,
        },
    is_complete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        },
    },
    {
        tableName: "tasks",
        timestamps: true,
        }
);

Task.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Task, { foreignKey: "user_id" });

export default Task;

