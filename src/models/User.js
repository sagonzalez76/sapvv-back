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
            unique:true
        },
        password: {
            type: DataTypes.STRING
        },
        role: {
            type: DataTypes.ENUM,
            values: ['student', 'teacher', 'director']
        }


    },
{
  timestamps: false
}
)