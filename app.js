import sequelize from "./src/config/database.js";
import express from "express";
import dotenv from "dotenv"; 
import taskRoutes from "./src/routes/tasks-routes.js";



dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/tasks", taskRoutes); // Use task routes
app.get("/", (req, res) => {
    res.send("Bienvenido a CRUD Tasks API");
    }
);
sequelize.authenticate()
  .then(() => {
    console.log("✅ Se estableció la conexión con la base de datos.");
    
    // Sincroniza los modelos con la base de datos
    return sequelize.sync({ force: false });
  })
  .then(() => {
    console.log("✅ Tablas sincronizadas con Sequelize.");
  })
  .catch((error) => {
    console.error("❌ Error al conectar o sincronizar la base de datos:", error);
  });

app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en  http://localhost:${PORT}`);
}
);
export default app;
