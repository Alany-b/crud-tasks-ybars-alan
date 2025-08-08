import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const user = sequelize.define ("user", {
    id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    },
    name: {
    type: DataTypes.STRING,
    allowNull: false,
},
    email: {
    type: DataTypes.STRING,
    allowNull: false,
       unique: true, // Ensure email is unique
    },
        password: {
    type: DataTypes.STRING,
    allowNull: false,
    },
}, {
    tableName: "users",
  timestamps: true, // Automatically manage createdAt and updatedAt fields

});
export default user;