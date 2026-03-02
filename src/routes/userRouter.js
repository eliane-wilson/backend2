import {Router} from 'express';
import userModel from '../models/userModel.js';
import bcrypt from "bcrypt";

const router = Router();


router.get('/', async (req, res) => {

    try {
        const result = await userModel.find();
        res.send({
            status: 'success',
            payload: result
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: error.message
        });
    }
});

router.post('/', async (req, res) => {
    
    const {first_name, last_name, age, email, password, role} = req.body;
    try {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const result = await userModel.create({first_name, last_name, age, email, password: hashedPassword, role});
        res.send({
            status: 'success',
            payload: result
        });
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
});

router.put('/:uid', async (req, res) => {
    const uid = req.params.uid;
    const {first_name, last_name, age, email, password, role} = req.body;
    try {
        const user = await userModel.findOne({_id: uid});
        if (!user) throw new Error('User not found');

        const newUser = {
            first_name: first_name ?? user.first_name,
            last_name: last_name ?? user.last_name,
            age: age ?? user.age,
            email: email ?? user.email,
            password: password ?? user.password,
            role: role ?? user.role,
        }

        const updateUser = await userModel.updateOne({_id: uid}, newUser);
        res.send({
            status: 'success',
            payload: updateUser
        });

    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
});

// Eliminar un usuario
router.delete('/:uid', async (req, res) => {
    const uid = req.params.uid;
    try {
        const result = await userModel.deleteOne({_id: uid});
        res.status(200).send({
            status: 'success',
            payload: result
        });
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
});

export default router;