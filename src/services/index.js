import UserDAO from "../dao/UserDAO.js";
import UserRepository from "../repositories/UserRepository.js";
import UserService from "./UserServices.js";

import TicketDAO from "../dao/TicketDAO.js";
import TicketRepository from "../repositories/TicketRepository.js";
import TicketService from "./TicketService.js";

import { productRepository } from "./product.js";
import { cartRepository } from "./cart.js";

const userDAO = new UserDAO();
const userRepository = new UserRepository(userDAO);
export const userService = new UserService(userRepository);

const ticketDAO = new TicketDAO();
const ticketRepository = new TicketRepository(ticketDAO);

export const ticketService = new TicketService(
  ticketRepository,
  productRepository,
  cartRepository
);