import {Router} from 'express';
import userModel from "../models/userModel.js";
import { createHash, isValidPassword } from "../utils/bcrypt.js";
import { generateToken } from "../utils/jwt.js";
import { auth } from "../middleware/auth.middleware.js";

const router = Router();



router.get("/current", auth, async (req, res)=>{
    res.send({
        status: "success",
        user: req.user
    });
});


router.use(json());

router.post("/register", async (req, res) => {
    const { first_name, last_name, age, email, password } = req.body;

    try {
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400);
            res.send("Usuario ya existe");
        }

        const newUser = await userModel.create({first_name, last_name, age, email, password: createHash(password)
        });

        res.send({
            status: "success",
            message: "Usuario registrado"
        });

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
});

router.post("/login", async (req, res)=>{
    try{
        const {email, password}= req.body;
         const user = await userModel.findOne({ email });
             if (!user) {
                return res.status(400);
                res.send("Usuario no encontrado");
             }

            if (!isValidPassword(user, password)) {
                return res.status(400);
                res.send("Contraseña incorrecta");
            }
        const token = generateToken(user);
        res.send({
         status: "success",
         message: "login exitoso ",
         token
        });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
});

router.get('/email/:email', async (req, res) => {
    const email = req.params.email;

    try {
        const user = await userModel.findOne({ email }) .select (- 'password');

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'Usuario no encontrado'
            });
        }

        res.json({
            status: 'success',
            payload: user
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

router.post("/logout",async(req, res)=>{
    
    res.send({
        status: "success",
        message: "sesion cerrada"
    });
});



export default router;

