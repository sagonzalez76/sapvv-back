// Import routes
import express from "express";
import morgan from "morgan";
import projectRoutes from "./routes/projects.routes.js";
import taskRoutes from "./routes/tasks.routes.js";
import authRoutes from "./routes/auth.routes.js";
import dotenv from 'dotenv';
import userRoutes from "./routes/user.routes.js"
const app = express();

// Middlewares
dotenv.config();
// app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/users", userRoutes)
app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);
app.use("/", authRoutes);

export default app;
