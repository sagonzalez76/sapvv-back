import { sequelize } from "../database/database.js";
import { Comunity } from "./Comunity.js";
import { Measure } from "./Measure.js";

export const ComunityMeasure = sequelize.define(
    'comunity_measures',
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
Comunity.belongsToMany(Measure, { through: ComunityMeasure });
Measure.belongsToMany(Comunity, { through: ComunityMeasure });


