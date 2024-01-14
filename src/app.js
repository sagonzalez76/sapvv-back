// Import routes
import cors from 'cors';
import express from "express";
import morgan from "morgan";
import programRoutes from "./routes/program.routes.js"
import rolesRoutes from "./routes/roles.routes.js"
import taskRoutes from "./routes/tasks.routes.js";
import authRoutes from "./routes/auth.routes.js";
import dotenv from 'dotenv';
import userRoutes from "./routes/user.routes.js"
import emitterRoutes from "./routes/emitter.routes.js"
import municipalityRoutes from "./routes/municipalitys.routes.js"
import typeComunityRoutes from "./routes/typeComunity.routes.js"
import comunityRoutes from "./routes/comunitys.routes.js"
import originRoutes from "./routes/origins.routes.js"
import commitmentRoutes from "./routes/commitments.routes.js"
import actionRoutes from "./routes/action.routes.js"
import evidenceRoutes from "./routes/evidence.routes.js"

import agentRoutes from "./routes/agents.routes.js"
import departmentRoutes from "./routes/department.routes.js"
import concertationRoutes from "./routes/concertation.routes.js"
import beneficiaryRoutes from "./routes/beneficiarys.routes.js"
import multer from 'multer';

// Configuracion de multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const app = express();

// Middlewares
dotenv.config();

// app.use(morgan("dev"));
app.use(express.json());
app.use(cors())

// Routes
app.use("/", authRoutes);
app.use("/users", userRoutes);
app.use("/departments", departmentRoutes)
app.use("/emitters", emitterRoutes)
app.use("/concertations", concertationRoutes)
app.use("/municipalitys", municipalityRoutes)
app.use("/agents", agentRoutes)
app.use("/programs", programRoutes);
app.use("/tasks", taskRoutes);
app.use("/roles", rolesRoutes);
app.use("/beneficiarys", beneficiaryRoutes);
app.use("/comunitys", comunityRoutes);
app.use("/origins", originRoutes);
app.use("/commitments", commitmentRoutes);
app.use("/evidences", evidenceRoutes);
app.use("/actions", actionRoutes);
app.use("/type_comunitys", typeComunityRoutes);

export default app;
