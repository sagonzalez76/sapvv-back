// Import routes
import cors from 'cors';
import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import morgan from "morgan";
import programRoutes from "./routes/program.routes.js"
import rolesRoutes from "./routes/roles.routes.js"
import taskRoutes from "./routes/tasks.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { config } from 'dotenv';
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
import pg from 'pg';
import downloadRoutes from "./routes/download.routes.js"

// Configuracion de multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const app = express();

// Middlewares

//Dotenv
config();
// const pool = new pg.Pool({

//     connectionString: process.env.DB_URL,
//     ssl: true
// })
// app.use(morgan("dev"));
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors())

// Routes
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// app.use("/ping", async (req, res) => {
//     const result = await pool.query('SELECT NOW()')

//     return res.json(result.rows[0])
// });

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
app.use("/download", downloadRoutes);


export default app;
