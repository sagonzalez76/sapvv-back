import { Enterprise } from "../models/Enterprise.js";
import { Sequelize } from "sequelize";

export async function createEnterprise(req, res) {
    try {
        console.log(req.body);
        const { name,
            description,
            zone,
            address,
            economic_sector,
            creation_date,
            observation,
            month,
            type, 
            financialFoundingId,
            trainingCenterId,
            municipalityId,
            comunityId,
            userId,
            economicActivityId
         } = req.body;

        const newEnterprise = await Enterprise.create({
            name,
            description,
            zone,
            address,
            economic_sector,
            creation_date,
            observation,
            month,
            type,
            financialFoundingId,
            trainingCenterId,
            municipalityId,
            comunityId,
            userId,
            economicActivityId

        });
        res.json(newEnterprise);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
export async function getEnterprises(req, res) {
    try {
        const enterprises = await Enterprise.findAll({
            attributes: ["id", "name"],
            include: {
            },
            order: [["id", "DESC"]],
        });

        res.json(enterprises);
    } catch (error) {
        console.log(error);
        // return res.status(500).json({ message: error });
    }
}

export async function updateEnterprise(req, res) {
    const { id } = req.params;
    const { name,
        description,
        zone,
        address,
        economic_sector,
        creation_date,
        observation,
        month,
        type, 
        financialFoundingId,
        trainingCenterId,
        municipalityId,
        comunityId,
        userId,
        economicActivityId
    } = req.body;

    try {

        const enterprise = await Enterprise.findByPk(id);

        enterprise.name = name;
        enterprise.description = description;
        enterprise.zone = zone;
        enterprise.address = address;
        enterprise.economic_sector = economic_sector;
        enterprise.creation_date = creation_date;
        enterprise.observation = observation;
        enterprise.month = month;
        enterprise.type = type;
        enterprise.financialFoundingId = financialFoundingId;
        enterprise.trainingCenterId = trainingCenterId;
        enterprise.municipalityId = municipalityId;
        enterprise.comunityId = comunityId;
        enterprise.userId = userId;
        enterprise.economicActivityId = economicActivityId;

        
        await enterprise.save();

        res.json(enterprise);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export async function deleteEnterprise(req, res) {
    const { id } = req.params;
    try {
        await Enterprise.destroy({
            where: { id },
        });

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export async function getEnterprise(req, res) {
    const { id } = req.params;
    try {
        const enterprise = await Enterprise.findOne({
            where: { id },
            attributes: ["id", "name", "emitterId", "type", "filing", "enterprise_date", "notification_date"],
        });
        res.json(enterprise);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}



export async function getProductiveUnitys(req, res) {
    try {

        const comunitys = await Enterprise.findAll({
            attributes: [
                "id",
                "name",
                "description",
                "zone",
                "address", // Supongo que hubo un error tipográfico, debería ser "address" en lugar de "adress"
                "economic_sector",
                "creation_date",
                "observation",
                "month",
                "type",
                "financialFoundingId",
                "trainingCenterId",
                "municipalityId",
                "comunityId",
                "userId",
                "economicActivityId"
            ],
            include: { all: true, nested: true },
            where: {
                type: 'Unidad Productiva'
            },
            order: [["id", "ASC"]],
            limit: 1000000
        });

        res.json(comunitys);

    } catch (error) {
        console.log('Este es el error', error);
        return res.status(500).json({ message: 'Error en GetEntrepreneurs', error });
    }
}

export async function getProductiveUnity(req, res) {
    const { id } = req.params;
    try {
        const comunity = await Enterprise.findOne({
            where: { id },
            attributes: ["id",
                "name",
                "description",
                "zone",
                "address", // Supongo que hubo un error tipográfico, debería ser "address" en lugar de "adress"
                "economic_sector",
                "creation_date",
                "observation",
                "month",
                "type",
                "financialFoundingId",
                "trainingCenterId",
                "municipalityId",
                "comunityId",
                "userId",
                "economicActivityId"

            ],
            include: { all: true, nested: false },
            order: [["id", "DESC"]],
        });
        res.json(comunity);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}