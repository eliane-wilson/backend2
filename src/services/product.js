import ProductDAO from "../dao/ProductDAO.js";
import ProductRepository from "../repositories/ProductRepository.js";

const productDAO = new ProductDAO();
export const productRepository = new ProductRepository(productDAO);