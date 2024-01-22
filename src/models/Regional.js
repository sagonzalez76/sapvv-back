import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Department } from "./Department.js";
import { TrainingCenter } from "./TrainingCenter.js";
export const Regional = sequelize.define(
    "regionals",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        }

    },
    {
        timestamps: true
    }
);

// Department.hasOne(Regional);
// Regional.belongsTo(Department);


Regional.hasMany(TrainingCenter);
TrainingCenter.belongsTo(Regional, { foreignKey: "regionalId", targetKey: "id" });

