import jwt from "jsonwebtoken";

const SECRET = "coderSecretJWT"; 

export const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            role: user.role
        },
        SECRET,
        { expiresIn: "1h" }
    );
};

export const verifyToken = (token) => {
    return jwt.verify(token, SECRET);
};