import { Role } from "../models/Role.js";

export async function getRoles(req, res) {
    try {
        const roles = await Role.findAll({
            atributes: ["id", "description"],
        });
        console.log(roles);
        res.json(roles);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

export async function createRole(req, res) {
    const { description } = req.body;
    console.log(req.body);
    try {
        let newRole = await Role.create(
            {
                description
            },
            {
                fields: ["description"],
            }
        );
        return res.json(newRole);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
    res.json("received");
}

export async function getRole(req, res) {
    const { id } = req.params;
    try {
        const role = await Role.findOne({
            where: {
                id,
            },
        });
        res.json(role);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

export const updateRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        console.log(req.body);

        const role = await Role.findByPk(id);
        role.description = description;
        await role.save();

        res.json(role);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export async function deleteRole(req, res) {
    const { id } = req.params;
    try {

        await Role.destroy({
            where: {
                id,
            },
        });
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
