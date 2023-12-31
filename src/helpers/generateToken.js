import jwt from "jsonwebtoken";


export const tokenSign = async (user) => {

    return jwt.sign(
        {
            id: user.id,
            role: user.role.description
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "1h"
        }
    );
}


export const verifyToken = async (token) => {
    try {
        return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    } catch (error) {
        return null
    }

}

export const decodeSign = async (token) => {

}