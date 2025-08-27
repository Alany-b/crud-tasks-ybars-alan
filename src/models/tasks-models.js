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
export default Task;

Task.belongsTo(User, { foreignKey: "user_id", as: "tasks" });
User.hasMany(Task, { foreignKey: "user_id" , as: "users" });


