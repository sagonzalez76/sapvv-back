import { TrainingCenter } from "../models/TrainingCenter.js";
import { Municipality } from "../models/Municipality.js";

export async function getTrainingCenters(req, res) {
    try {
        const trainingcenters = await TrainingCenter.findAll({
            //TODO CON ATTRIBUTES ELEGIMOS LOS CAMPOS QUE QUEREMOS RETORNAR EN EL RES
            attributes: ["id", "name", "code", "regionalId", "municipalityId"],
            include: {
                all:true
            }
        });
        res.json(trainingcenters);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}



export async function createTrainingCenter(req, res) {
    const { code, name, regionalId, municipalityId } = req.body;
    console.log(req.body);
    try {
        let newTrainingCenter = await TrainingCenter.create(
            {
                code, name, regionalId, municipalityId

            },
            {
                fields: ["code","name","regionalId","municipalityId"],
            }
        );
        return res.json(newTrainingCenter);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
    res.json("received");
}

export async function getTrainingCenter(req, res) {
    const { id } = req.params;
    try {
        const trainingcenter = await TrainingCenter.findOne({
            where: {
                id,
            },
            include: {
                all:true
            },
            //TODO CON ATTRIBUTES ELEGIMOS LOS CAMPOS QUE QUEREMOS RETORNAR EN EL RES
            //EVITAMOS QUE SE ENVIE LA CONTRASENA
            attributes: ["id", "name", "code", "municipalityId", "regionalId"],

        });

        res.json(trainingcenter);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

export const updateTrainingCenter = async (req, res) => {
    try {
        const { id } = req.params;
        const { code, name, regionalId, municipalityId } = req.body;
        console.log(req.body);

        const trainingcenter = await TrainingCenter.findByPk(id);

        trainingcenter.code = code;
        trainingcenter.name = name;
        trainingcenter.regionalId = regionalId;
        trainingcenter.municipalityId = municipalityId;


        await trainingcenter.save();

        res.json(trainingcenter);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export async function deleteTrainingCenter(req, res) {
    const { id } = req.params;
    try {
        await TrainingCenter.destroy({
            where: {
                id,
            },
        });
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export async function getTrainingCenterMunicipalitys(req, res) {
    const { id } = req.params;
    try {
        const municipalitys = await Municipality.findAll({
            attributes: ["id", "trainingcenterId", "name"],
            where: { trainingcenterId: id },
        });
        console.log(municipalitys);
        res.json(municipalitys);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}