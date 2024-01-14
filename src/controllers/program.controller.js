import { Program } from "../models/Program.js";

export async function getPrograms(req, res) {
    try {
        const programs = await Program.findAll({
            atributes: ["id", "name"],
        });
        res.json(programs);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

export async function createProgram(req, res) {
    const { name } = req.body;
    try {
        let newProgram = await Program.create(
            {
                name
            },
            {
                fields: ["name"],
            }
        );
        return res.json(newProgram);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
    res.json("received");
}

export async function getProgram(req, res) {
    const { id } = req.params;
    try {
        const program = await Program.findOne({
            where: {
                id,
            },
        });
        res.json(program);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

export const updateProgram = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const program = await Program.findByPk(id);
        program.name = name;

        await program.save();

        res.json(program);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export async function deleteProgram(req, res) {
    const { id } = req.params;
    try {

        await Program.destroy({
            where: {
                id,
            },
        });
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
