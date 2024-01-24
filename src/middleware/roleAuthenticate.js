import { verifyToken } from '../helpers/generateToken.js'
import { User } from "../models/User.js";
import { Role } from '../models/Role.js';
import { Sequelize } from 'sequelize';

export const checkRoleAuth = (roles) => async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ').pop()
        // console.log('estes es lo que llega', req.headers);
        const tokenData = await verifyToken(token)
    
        const userData = await User.findOne({
            where: { id: `${tokenData.id}` },
            include: {
                model: Role,
                attributes: ["description"],
                where: Sequelize.literal('users."roleId" = "role"."id"'),
                required: false
            },


        });
        // console.log(userData.role.description);
        // console.log(roles);
        if ([].concat(roles).includes(userData.role.description)) {
            next()
        } else {
            res.status(409)
            res.send({ error: "No tienes permisos" })
        }

    } catch (e) {
        console.log(e)

    }

}