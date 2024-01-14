import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";


export const Evidence = sequelize.define(
    "evidences",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        type: {
            type: DataTypes.ENUM,
            values: [
                'audio/mpeg', 'audio/wav', 'audio/ogg', // Tipos de audio
                'image/jpeg', 'image/png', 'image/gif', 'image/svg+xml', // Tipos de imagen
                'video/mp4', 'video/webm', 'video/ogg', // Tipos de video
                'application/pdf', // PDF
                'text/plain', 'text/html', 'application/msword', 'application/vnd.ms-excel', 'application/docx', 'docx', 'application/doc',// Tipos de texto
            ],
            allowNull: false,
            notEmpty: true

        }, url: {
            type: DataTypes.STRING,
            allowNull: false,
            notEmpty: true
        }
    },
    {
        timestamps: true,
        freezeTableName: true
    },
    {

    }

);