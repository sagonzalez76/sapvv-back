import { verifyToken } from '../helpers/generateToken.js'

export const checkAuth = async (req, res, next) => {
    try {
        const token = await req.headers.authorization.split(' ').pop()
        const tokenData = await verifyToken(token)
        // console.log(tokenData);
        if (tokenData) {
            next()
        } else {
            res.status(409)
            res.send({ error: 'Tu por aqui no pasas!' })
        }

    } catch (e) {
        console.log(e)
        res.status(409)
        res.send({ error: 'No tienes acceso!' })
    }

}