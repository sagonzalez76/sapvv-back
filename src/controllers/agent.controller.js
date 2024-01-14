import { Agent } from "../models/Agent.js";
import { Comunity } from "../models/Comunity.js";
import { Sequelize } from "sequelize";

export async function createAgent(req, res) {
    try {
        const { name, lastname, phone, id_type, id_number, comunityId } = req.body;
        // console.log(req.body);
        const newAgent = await Agent.create({
            name,
            lastname,
            phone,
            id_type,
            id_number,
            comunityId
        });
        res.json(newAgent);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
export async function getAgents(req, res) {
    try {
        const agents = await Agent.findAll({
            attributes: ["id", "name", "lastname", "phone", "id_type", "id_number", "comunityId"],
            include: {
                model: Comunity,
                attributes: ["name"],
                where: Sequelize.literal('agents."comunityId" = "comunity"."id"'),

                required: true
            },
            order: [["id", "DESC"]],
        });

        res.json(agents);
    } catch (error) {
        console.log(error);
        // return res.status(500).json({ message: error });
    }
}
export async function updateAgent(req, res) {
    const { id } = req.params;
    const { name, lastname, phone, id_type, id_number, comunityId } = req.body;

    try {

        const agent = await Agent.findByPk(id);
        agent.name = name;
        agent.lastname = lastname;
        agent.phone = phone;
        agent.id_type = id_type;
        agent.id_number = id_number;
        agent.comunityId = parseInt(comunityId, 10); // Convertir a entero
        await agent.save();

        res.json(agent);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export async function deleteAgent(req, res) {
    const { id } = req.params;
    try {
        await Agent.destroy({
            where: { id },
        });

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export async function getAgent(req, res) {
    const { id } = req.params;
    try {
        const agent = await Agent.findOne({
            where: { id },
            attributes: ["id", "comunityId", "name", 'lastname', "phone", "id_type", "id_number",],
        });
        res.json(agent);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
