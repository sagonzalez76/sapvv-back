import { Beneficiary } from "../models/Beneficiary.js";
import { Comunity } from "../models/Comunity.js";
import { Sequelize } from "sequelize";

export async function createBeneficiary(req, res) {
    try {
        const { name, lastname, phone, id_type, id_number, comunityId } = req.body;
        // console.log(req.body);
        const newBeneficiary = await Beneficiary.create({
            name,
            lastname,
            phone,
            id_type,
            id_number,
            comunityId
        });
        res.json(newBeneficiary);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
export async function getBeneficiarys(req, res) {
    try {
        const beneficiarys = await Beneficiary.findAll({
            attributes: ["id", "name", "lastname", "phone", "id_type", "id_number", "comunityId"],
            include: {
                model: Comunity,
                attributes: ["name", "lastname"],
                where: Sequelize.literal('beneficiarys."comunityId" = "comunity"."id"'),

                required: true
            },
            order: [["id", "DESC"]],
        });

        res.json(beneficiarys);
    } catch (error) {
        console.log(error);
        // return res.status(500).json({ message: error });
    }
}

export async function updateBeneficiary(req, res) {
    const { id } = req.params;
    const { name, lastname, phone, id_type, id_number, comunityId } = req.body;

    try {

        const beneficiary = await Beneficiary.findByPk(id);
        beneficiary.name = name;
        beneficiary.lastname = lastname;
        beneficiary.phone = phone;
        beneficiary.id_type = id_type;
        beneficiary.id_number = id_number;
        beneficiary.comunityId = parseInt(comunityId, 10); // Convertir a entero
        await beneficiary.save();

        res.json(beneficiary);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export async function deleteBeneficiary(req, res) {
    const { id } = req.params;
    try {
        await Beneficiary.destroy({
            where: { id },
        });

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export async function getBeneficiary(req, res) {
    const { id } = req.params;
    try {
        const beneficiary = await Beneficiary.findOne({
            where: { id },
            attributes: ["id", "comunityId", "name", 'lastname', "phone", "id_type", "id_number",],
        });
        res.json(beneficiary);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
