// Import routes
import cors from 'cors';
import express from "express";
import morgan from "morgan";
import projectRoutes from "./routes/projects.routes.js";
import rolesRoutes from "./routes/roles.routes.js"
import taskRoutes from "./routes/tasks.routes.js";
import authRoutes from "./routes/auth.routes.js";
import dotenv from 'dotenv';
import userRoutes from "./routes/user.routes.js"
import departmentRoutes from "./routes/department.routes.js"
import municipalityRoutes from "./routes/municipalitys.routes.js"

const app = express();

// Middlewares
dotenv.config();

// app.use(morgan("dev"));
app.use(express.json());
app.use(cors())
// Routes
app.use("/users", userRoutes);
app.use("/departments", departmentRoutes)
app.use("/municipalitys", municipalityRoutes)
app.use("/projects", projectRoutes);
app.use("/programs", projectRoutes);
app.use("/tasks", taskRoutes);
app.use("/roles", rolesRoutes);
app.use("/", authRoutes);

export default app;
