import { Commitment } from "../models/Commitment.js";
import { Origin } from "../models/Origin.js";
import { Sequelize } from "sequelize";

export async function createCommitment(req, res) {
    try {
        console.log(req.body);
        const { name, originId} = req.body;
        const newCommitment = await Commitment.create({
            originId,
            name
        });
        res.json(newCommitment);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
export async function getCommitments(req, res) {
    try {
        const commitments = await Commitment.findAll({
            attributes: ["id", "name", "originId", ],
            include: {
                model: Origin,
                attributes: ["name"],
                where: Sequelize.literal('commitments."originId" = "origin"."id"'),

                required: true
            },
            order: [["id", "DESC"]],
        });

        res.json(commitments);
    } catch (error) {
        console.log(error);
        // return res.status(500).json({ message: error });
    }
}

export async function updateCommitment(req, res) {
    const { id } = req.params;
    const { name, originId } = req.body;

    try {

        const commitment = await Commitment.findByPk(id);
        commitment.name = name;
        commitment.originId = parseInt(originId, 10); // Convertir a entero
        await commitment.save();

        res.json(commitment);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export async function deleteCommitment(req, res) {
    const { id } = req.params;
    try {
        await Commitment.destroy({
            where: { id },
        });

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export async function getCommitment(req, res) {
    const { id } = req.params;
    try {
        const commitment = await Commitment.findOne({
            where: { id },
            attributes: ["id", "name", "originId"],
        });
        res.json(commitment);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
