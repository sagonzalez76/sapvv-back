import jwt from "jsonwebtoken";


export const tokenSign = async (user) => {
    return jwt.sign(
        {
            id: user.id,
            role: user.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "30s"
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