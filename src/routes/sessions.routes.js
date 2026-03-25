import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import UserDTO from "../dto/userDTO.js";
import { generateToken } from "../utils/jwt.js";
import { userService } from "../services/index.js";
const router = Router();

router.get(
  "/current",
  passport.authenticate("current", { session: false }),
  (req, res) => {
    const user = new UserDTO(req.user);

    res.send({
      status: "success",
      user
    });
  }
);

router.post("/register", async (req, res) => {
  try {
    await userService.registerUser(req.body);

    res.send({
      status: "success",
      message: "Usuario registrado"
    });

  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userService.loginUser(email, password);

    const token = generateToken(user);

    res.send({
      status: "success",
      message: "Login exitoso",
      token
    });

  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/email/:email", async (req, res) => {
  try {
    const user = await userService.getUserByEmail(req.params.email);

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "Usuario no encontrado"
      });
    }

    const { password, ...safeUser } = user.toObject();

    res.json({
      status: "success",
      payload: safeUser
    });

  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
});

router.post("/forgot-password", async (req, res) => {
  try {
    const user = await userService.getUserByEmail(req.body.email);

    if (!user) {
      return res.status(404).send("Usuario no encontrado");
    }

    const token = jwt.sign(
      { email: user.email },
      process.env.RESET_SECRET,
      { expiresIn: "1h" }
    );

    const link = `http://localhost:8080/reset-password?token=${token}`;

    res.send({
      status: "success",
      message: "Link de recuperación generado",
      link
    });

  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/reset-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!newPassword) {
      return res.status(400).send("Password requerido");
    }

    const decoded = jwt.verify(token, process.env.RESET_SECRET);

    await userService.updatePassword(decoded.email, newPassword);

    res.send({
      status: "success",
      message: "Contraseña actualizada"
    });

  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/logout", (req, res) => {
  res.send({
    status: "success",
    message: "Sesión cerrada"
  });
});

export default router;