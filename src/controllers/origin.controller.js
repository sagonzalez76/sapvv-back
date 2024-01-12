import { Origin } from "../models/Origin.js";
import { Emitter } from "../models/Emitter.js";
import { Sequelize } from "sequelize";

export async function createOrigin(req, res) {
    try {
        console.log(req.body);
        const { name, emitterId, type, filing, origin_date, notification_date } = req.body;
        const newOrigin = await Origin.create({
            emitterId,
            name,
            type,
            filing,
            origin_date,
            notification_date
        });
        res.json(newOrigin);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
export async function getOrigins(req, res) {
    try {
        const origins = await Origin.findAll({
            attributes: ["id", "name", "emitterId", "type", "filing", "origin_date", "notification_date"],
            include: {
                model: Emitter,
                attributes: ["name"],
                where: Sequelize.literal('origins."emitterId" = "emitter"."id"'),

                required: true
            },
            order: [["id", "DESC"]],
        });

        res.json(origins);
    } catch (error) {
        console.log(error);
        // return res.status(500).json({ message: error });
    }
}

export async function updateOrigin(req, res) {
    const { id } = req.params;
    const { name, emitterId } = req.body;

    try {

        const origin = await Origin.findByPk(id);
        origin.name = name;
        origin.emitterId = parseInt(emitterId, 10); // Convertir a entero
        await origin.save();

        res.json(origin);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export async function deleteOrigin(req, res) {
    const { id } = req.params;
    try {
        await Origin.destroy({
            where: { id },
        });

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export async function getOrigin(req, res) {
    const { id } = req.params;
    try {
        const origin = await Origin.findOne({
            where: { id },
            attributes: ["id", "name", "emitterId", "type", "filing", "origin_date", "notification_date"],
        });
        res.json(origin);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
