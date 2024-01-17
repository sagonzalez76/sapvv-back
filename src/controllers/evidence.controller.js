import { Evidence } from "../models/Evidence.js";
import path from 'path';
import fs from 'fs/promises'
import { Action } from "../models/Action.js";
import { Sequelize } from "sequelize";

export async function getEvidences(req, res) {
    try {
        const evidences = await Evidence.findAll({
            attributes: ["id", "name", "type", "url" ],
            include: {
                model: Action,
                attributes: ["description"],
                where: Sequelize.literal('evidences."actionId" = "action"."id"'),

                required: true
            },
            order: [["id", "DESC"]],
        });

        res.json(evidences);
    } catch (error) {
        console.log(error);
        // return res.status(500).json({ message: error });
    }
}
export async function createEvidence(req, res) {
    // `req.files` contiene la lista de archivos

    const archivos = req.files;
    const id = req.body.id[0]
    console.log(archivos);
    // console.log(req.body.id);
    try {
        // Lógica para procesar y guardar los archivos, por ejemplo, en la base de datos
        const evidences = [];

        for (const archivo of archivos) {
            const { mimetype, filename, originalname } = archivo;
            console.log("este es el tipo de archivoooooo", mimetype, filename);
            // Lógica para guardar el archivo en algún lugar (por ejemplo, en la carpeta 'uploads')
            const filePath = path.join('uploads', originalname);
            await fs.rename(archivo.path, filePath);

            // Añade la evidencia al array
            evidences.push({
                name:originalname,
                type: mimetype,
                url: originalname,  // Almacena solo el nombre del archivo
                actionId: id
            });
        }

        // Luego, crea las evidencias en la base de datos
        const newEvidences = await Evidence.bulkCreate(evidences);
        console.log(newEvidences);

        res.json(newEvidences); // Solo envía una respuesta aquí, después de crear las evidencias
    } catch (error) {
        console.error('Error al procesar evidencias:', error.message);
        res.status(500).json({
            message: 'Error interno del servidor al procesar evidencias.',
        });
    }
}

export async function getEvidence(req, res) {
    const { id } = req.params;
    try {
        const evidence = await Evidence.findOne({
            where: {
                id,
            },
        });
        res.json(evidence);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

export const updateEvidence = async (req, res) => {
    try {
        const { id } = req.params;
        const { description, done } = req.body;

        const evidence = await Evidence.findByPk(id);
        evidence.description = description;
        evidence.done = done;


        await evidence.save();

        res.json(evidence);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export async function deleteEvidence(req, res) {
    const { id } = req.params;
    try {

        await Evidence.destroy({
            where: {
                id,
            },
        });
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
