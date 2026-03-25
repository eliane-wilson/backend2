import CartDAO from "../dao/CartDAO.js";
import CartRepository from "../repositories/CartRepository.js";

const cartDAO = new CartDAO();
export const cartRepository = new CartRepository(cartDAO);