import { verifyToken } from '../helpers/generateToken.js'
import { User } from "../models/User.js";


export const checkRoleAuth = (roles) => async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ').pop()
        const tokenData = await verifyToken(token)
        const userData = await User.findOne({ where: { id: `${tokenData.id}` } });

        if ([].concat(roles).includes(userData.role)) {
            next()
        } else {
            res.status(409)
            res.send({ error: "No tienes permisos" })
        }

    } catch (e) {
        console.log(e)
        res.status(409)
        res.send({ error: 'No tienes permiso!' })
    }

}