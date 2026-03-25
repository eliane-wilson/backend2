import { v4 as uuidv4 } from "uuid";

export default class TicketService {
  constructor(ticketRepository, productRepository, cartRepository) {
    this.ticketRepository = ticketRepository;
    this.productRepository = productRepository;
    this.cartRepository = cartRepository;
  }

  purchaseCart = async (cartId, userEmail) => {

    const cart = await this.cartRepository.getCartById(cartId);

    let total = 0;
    let productsNotPurchased = [];

    for (const item of cart.products) {

      const product = await this.productRepository.getById(item.product._id);

      if (product.stock >= item.quantity) {
        product.stock -= item.quantity;
        await this.productRepository.update(product._id, product);

        total += product.price * item.quantity;
      } else {
        productsNotPurchased.push(item);
      }
    }

    if (total > 0) {
      const ticket = await this.ticketRepository.createTicket({
        code: uuidv4(),
        amount: total,
        purchaser: userEmail
      });

      return {
        status: "success",
        ticket,
        notProcessed: productsNotPurchased
      };
    }

    return {
      status: "error",
      message: "No se pudo procesar la compra",
      notProcessed: productsNotPurchased
    };
  };
}