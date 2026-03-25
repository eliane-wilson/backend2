import productModel from "../models/productModel.js";

export default class ProductDAO {
  getById = (id) => {
    return productModel.findById(id);
  };

  update = (id, data) => {
    return productModel.findByIdAndUpdate(id, data, { new: true });
  };
}