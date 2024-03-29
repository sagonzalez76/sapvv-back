import { Enterprise } from "./Enterprise.js";
import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";


export const User = sequelize.define(
    "users",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        lastname: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            isEmail: true,
            unique: true
        },
        password: {
            type: DataTypes.STRING
        }
        // role: {
        //     type: DataTypes.ENUM,
        //     values: ['student', 'teacher', 'director', 'estudiante', 'enlace', 'juridico', 'dinamizador']
        // }
    },
    {
        timestamps: false
    }
)

User.hasMany(Enterprise, {
    foreignKey: "userId",
    sourceKey: "id",
});
Enterprise.belongsTo(User, { foreignKey: "userId", targetId: "id" });