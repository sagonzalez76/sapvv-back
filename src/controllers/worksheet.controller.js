import { Worksheet } from "../models/Worksheet.js";
import { Sequelize } from "sequelize";
import { Action } from "../models/Action.js";

export async function createWorksheet(req, res) {
    try {
        const { number,
            state,
            start_date,
            end_date,
            responsible_name,
            responsible_lastname,
            responsible_email,
            responsible_phone,
            actionId } = req.body;
        const newWorksheet = await Worksheet.create({
            number,
            state,
            start_date,
            end_date,
            responsible_name,
            responsible_lastname,
            responsible_email,
            responsible_phone,
            actionId
        });
        res.json(newWorksheet);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
export async function getWorksheets(req, res) {
    try {
        const worksheets = await Worksheet.findAll({
            attributes: ["id", 'number',
                'state',
                'start_date',
                'end_date',
                'responsible_name',
                'responsible_lastname',
                'responsible_email',
                'responsible_phone',
                'actionId'],
            include: {
                model: Action,
                attributes: ["description"],
                where: Sequelize.literal('worksheets."actionId" = "action"."id"'),

                required: true
            },
            order: [["id", "DESC"]],
        });

        res.json(worksheets);
    } catch (error) {
        console.log(error);
        // return res.status(500).json({ message: error });
    }
}

export async function updateWorksheet(req, res) {
    const { id } = req.params;
    const { number,
        state,
        start_date,
        end_date,
        responsible_name,
        responsible_lastname,
        responsible_email,
        responsible_phone,
        actionId } = req.body;

    try {

        const worksheet = await Worksheet.findByPk(id);
        worksheet.number = number;
        worksheet.state = state;
        worksheet.start_date = start_date;
        worksheet.end_date = end_date;
        worksheet.responsible_name = responsible_name;
        worksheet.responsible_lastname = responsible_lastname;
        worksheet.responsible_email = responsible_email;
        worksheet.responsible_phone = responsible_phone;
        worksheet.actionId = actionId;
        await worksheet.save();

        res.json(worksheet);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export async function deleteWorksheet(req, res) {
    const { id } = req.params;
    try {
        await Worksheet.destroy({
            where: { id },
        });

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export async function getWorksheet(req, res) {
    const { id } = req.params;
    try {
        const worksheet = await Worksheet.findOne({
            where: { id },
            attributes: ["id", 'number',
                'state',
                'start_date',
                'end_date',
                'responsible_name',
                'responsible_lastname',
                'responsible_email',
                'responsible_phone',
                'actionId'],
        });
        res.json(worksheet);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
