import sequelize from "./src/config/database.js";
import express from "express";
import dotenv from "dotenv"; 


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send("Welcome to the CRUD Tasks API");
    }
);
sequelize.authenticate()
    .then(() => {
        console.log("Database connection has been established successfully.");
    }
    )
    .catch((error) => {
        console.error("Unable to connect to the database:", error);
    }
    );
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}
);
export default app;

// This file is the entry point for the application, setting up the server and database connection.
// It uses Express for routing and Sequelize for database interactions.
// The server listens on a specified port and responds to the root URL with a welcome message.          