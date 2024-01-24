import { sequelize } from "../database/database.js";
import { Measure } from "./Measure.js";
import { Program } from "./Program.js";

export const MeasureProgram = sequelize.define(
    'measure_programs',
    {
        // Aqui pueden ir atributos
    },
    {
        timestamps: true
    },
    {
        freezeTableName: true
    }
);

// Relaciones
Measure.belongsToMany(Program, { through: MeasureProgram });
Program.belongsToMany(Measure, { through: MeasureProgram });


