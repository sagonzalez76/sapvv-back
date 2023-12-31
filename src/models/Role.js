import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { User } from "./User.js";

export const Role = sequelize.define(
    "roles",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: DataTypes.STRING
        }

    },
    {
        timestamps: true
    }
)


Role.hasMany(User, {
    foreignKey: "roleId",
    sourceKey: "id",
});
User.belongsTo(Role, { foreignKey: "roleId", targetId: "id" });