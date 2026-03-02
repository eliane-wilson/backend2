import jwt from "jsonwebtoken";

const SECRET = "coderSecretJWT";

export const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send("No autorizado");
    }

    const token = authHeader.split(" ")[1];

    try {
        const user = jwt.verify(token, SECRET);
        req.user = user;
        next();
    } catch (error) {
        return res.status(403).send("Token inválido");
    }
};