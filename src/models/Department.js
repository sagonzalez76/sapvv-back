import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Municipality } from "./Municipality.js";

export const Department = sequelize.define(
    "departments",
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

Department.hasMany(Municipality, {
    foreignKey: "departmentId",
    sourceKey: "id",
});
Municipality.belongsTo(Department, { foreignKey: "departmentId", targetId: "id" });