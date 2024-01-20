import { Dependency } from "../models/Dependency.js";
import { Municipality } from "../models/Municipality.js";

export async function getDependencys(req, res) {
    try {
        const dependencys = await Dependency.findAll({
            //TODO CON ATTRIBUTES ELEGIMOS LOS CAMPOS QUE QUEREMOS RETORNAR EN EL RES
            attributes: ["id", "name"],
        });
        res.json(dependencys);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}



export async function createDependency(req, res) {
    const { name } = req.body;
    console.log(req.body);
    try {
        let newDependency = await Dependency.create(
            {
                name

            },
            {
                fields: ["name"],
            }
        );
        return res.json(newDependency);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
    res.json("received");
}

export async function getDependency(req, res) {
    const { id } = req.params;
    try {
        const dependency = await Dependency.findOne({
            where: {
                id,
            },
            //TODO CON ATTRIBUTES ELEGIMOS LOS CAMPOS QUE QUEREMOS RETORNAR EN EL RES
            //EVITAMOS QUE SE ENVIE LA CONTRASENA
            attributes: ["id", "name"],

        });

        res.json(dependency);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

export const updateDependency = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        console.log(req.body);

        const dependency = await Dependency.findByPk(id);
        dependency.name = name;
        await dependency.save();

        res.json(dependency);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export async function deleteDependency(req, res) {
    const { id } = req.params;
    try {
        await Dependency.destroy({
            where: {
                id,
            },
        });
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export async function getDependencyMunicipalitys(req, res) {
    const { id } = req.params;
    try {
        const municipalitys = await Municipality.findAll({
            attributes: ["id", "dependencyId", "name"],
            where: { dependencyId: id },
        });
        console.log(municipalitys);
        res.json(municipalitys);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}