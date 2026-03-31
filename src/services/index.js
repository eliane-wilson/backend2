import CartDAO from "../dao/CartDAO.js";
import CartRepository from "../repositories/CartRepository.js";

import ProductDAO from "../dao/ProductDAO.js";
import ProductRepository from "../repositories/ProductRepository.js";

import UserDAO from "../dao/UserDAO.js";
import UserRepository from "../repositories/UserRepository.js";
import UserService from "./UserServices.js";

import TicketDAO from "../dao/TicketDAO.js";
import TicketRepository from "../repositories/TicketRepository.js";
import TicketService from "./TicketService.js";



const cartDAO = new CartDAO();
export const cartRepository = new CartRepository(cartDAO);

const productDAO = new ProductDAO();
export const productRepository = new ProductRepository(productDAO);

const userDAO = new UserDAO();
const userRepository = new UserRepository(userDAO);
export const userService = new UserService(userRepository, cartRepository);

const ticketDAO = new TicketDAO();
const ticketRepository = new TicketRepository(ticketDAO);

export const ticketService = new TicketService(
  ticketRepository,
  productRepository,
  cartRepository
);

