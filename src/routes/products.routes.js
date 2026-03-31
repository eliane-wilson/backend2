import { Router } from "express";
import { productRepository } from "../services/product.js";
import passport from "passport";

const router = Router();

router.get("/", async (req, res) => {
  const products = await productRepository.getAll();
  res.send(products);
});

router.post(
  "/",
  passport.authenticate("current", { session: false }),
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