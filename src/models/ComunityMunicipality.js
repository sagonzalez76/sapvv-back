// comunityMunicipality.js
import { sequelize } from "../database/database.js";
import { Comunity } from "./Comunity.js";
import { Municipality } from "./Municipality.js";
// Corrige el nombre de la tabla intermedia
export const ComunityMunicipality = sequelize.define(
    'comunity_municipalities',
    {
        // Puedes definir atributos si es necesario
    },
    {
        timestamps: true
    },
    {
        freezeTableName: true
    }
);

// Relaciones
Comunity.belongsToMany(Municipality, {through: ComunityMunicipality,}); 
Municipality.belongsToMany(Comunity, { through: ComunityMunicipality });


