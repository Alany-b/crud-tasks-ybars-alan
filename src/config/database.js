import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

 export const sequelize = new Sequelize(
  process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
        port: process.env.DB_PORT,
        logging: false, 
        }
);
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("CONEXION ESTABLECIDA CON EXITO ♥️");
    await sequelize.sync({ alter: true });
  } catch (error) {
    console.error("ERROR AL CONECTAR ❌", error);
  } 
};
export default sequelize;

