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

Department.hasOne(Regional, {
    foreignKey: 'departmentId',
    sourceKey: 'id'
});

Regional.belongsTo(Department, {
    foreignKey: 'departmentId',
    targetKey: 'id'
});


Regional.hasMany(TrainingCenter, {
    foreignKey: "regionalId",
    sourceKey: "id",
});
TrainingCenter.belongsTo(Regional, { foreignKey: "regionalId", targetId: "id" });

