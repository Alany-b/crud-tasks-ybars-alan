import sequelize from "./src/config/database.js";
import express from "express";
import dotenv from "dotenv"; 


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send("Bienvenido a CRUD Tasks API");
    }
);
sequelize.authenticate()
    .then(() => {
        console.log("Se establecio la conexion con la base de datos.");
    }
    )
    .catch((error) => {
        console.error("❎ Hubo un error al conectarse con la base de datos:", error);
    }
    );
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en  http://localhost:${PORT}`);
}
);
export default app;
