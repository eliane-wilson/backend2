import { Router } from "express";
import { cartRepository } from "../services/index.js";
import { productRepository } from "../services/product.js";
import { ticketService } from "../services/index.js";
import { authorize } from "../middlewares/authorization.middleware.js";
import passport from "passport";

const router = Router();

router.post(
  "/:cid/product/:pid",
  passport.authenticate("current", { session: false }),
  authorize("user"),
  async (req, res) => {
    try {
      const { cid, pid } = req.params;

      const cart = await cartRepository.getCartById(cid);
      if (!cart) return res.status(404).send("Carrito no encontrado");

      const product = await productRepository.getById(pid);
      if (!product) return res.status(404).send("Producto no encontrado");

      const productInCart = cart.products.find(
        (p) => p.product._id.toString() === pid
      );

      if (productInCart) {
        productInCart.quantity += 1;
      } else {
        cart.products.push({ product: pid, quantity: 1 });
      }

      await cart.save();

      res.send({
        status: "success",
        message: "Producto agregado"
      });

    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

router.post(
  "/:cid/purchase",
  passport.authenticate("current", { session: false }),
  authorize("user"),
  async (req, res) => {
    try {
      const { cid } = req.params;

      const result = await ticketService.purchaseCart(cid, req.user.email);

      res.send({
        status: "success",
        payload: result
      });

    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

export default router;