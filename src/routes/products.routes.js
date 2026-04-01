import { Router } from "express";
import { productRepository } from "../services/product.js";
import { authorize } from "../middlewares/authorization.middleware.js";
import passport from "passport";

const router = Router();

router.get("/", async (req, res) => {
  const products = await productRepository.getAll();
  res.send(products);
});

router.post(
  "/",
  passport.authenticate("current", { session: false }),
  authorize("admin"),
  async (req, res) => {
    try {
      const product = await productRepository.create(req.body);
      res.send(product);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
);

export default router;