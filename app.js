import express from "express";
import dotenv from "dotenv"; 
import taskRouter from "./src/routes/tasks-routes.js";
import UserRouter from "./src/routes/user-routes.js";
import { connectDB } from "./src/config/database.js";



dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/api/tasks", taskRouter); // Use task routes
app.use("/api/users", UserRouter ); // Use user routes
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(
      `Conexión con la base de datos establecida \nhttp://localhost:${PORT}/api/task \nhttp://localhost:${PORT}/api/user`
    );
  });
});

// app.get("/", (req, res) => {
  //   res.send("Bienvenido a CRUD Tasks API");
  // }
  // );
// app.use(express.urlencoded({ extended: true }));
// sequelize.authenticate()
//   .then(() => {
    //     console.log("✅ Se estableció la conexión con la base de datos.");
    
//     // Sincroniza los modelos con la base de datos
//     return sequelize.sync({ force: false });
//   })
//   .then(() => {
//     console.log("✅ Tablas sincronizadas con Sequelize.");
//   })
//   .catch((error) => {
//     console.error("❌ Error al conectar o sincronizar la base de datos:", error);
//   });

// app.listen(PORT, () => {
//     console.log(`✅ Servidor corriendo en  http://localhost:${PORT}`);
// }
// );
// export default app;