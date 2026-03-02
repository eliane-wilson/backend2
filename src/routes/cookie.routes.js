import { Router } from "express";

const router = Router();

router.get("/set-cookie", (req, res) => {
    res.cookie("clave", "valor", {
        httpOnly: true,
        maxAge: 600000
    });
    res.send("cookie seteada");
});

export default router;
