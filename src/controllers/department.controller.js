import { Department } from "../models/Department.js";
import { Municipality } from "../models/Municipality.js";

export async function getDepartments(req, res) {
    try {
        const departments = await Department.findAll({
            //TODO CON ATTRIBUTES ELEGIMOS LOS CAMPOS QUE QUEREMOS RETORNAR EN EL RES
            attributes: ["id", "name"],
        });
        res.json(departments);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}



export async function createDepartment(req, res) {
    const { name } = req.body;
    console.log(req.body);
    try {
        let newDepartment = await Department.create(
            {
                name

            },
            {
                fields: ["name"],
            }
        );
        return res.json(newDepartment);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
    res.json("received");
}

export async function getDepartment(req, res) {
    const { id } = req.params;
    try {
        const department = await Department.findOne({
            where: {
                id,
            },
            //TODO CON ATTRIBUTES ELEGIMOS LOS CAMPOS QUE QUEREMOS RETORNAR EN EL RES
            //EVITAMOS QUE SE ENVIE LA CONTRASENA
            attributes: ["id", "name"],

        });

        res.json(department);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

export const updateDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        console.log(req.body);

        const department = await Department.findByPk(id);
        department.name = name;
        await department.save();

        res.json(department);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export async function deleteDepartment(req, res) {
    const { id } = req.params;
    try {
        await Department.destroy({
            where: {
                id,
            },
        });
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export async function getDepartmentMunicipalitys(req, res) {
    const { id } = req.params;
    try {
        const municipalitys = await Municipality.findAll({
            attributes: ["id", "departmentId", "name"],
            where: { departmentId: id },
        });
        console.log(municipalitys);
        res.json(municipalitys);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}