import productModel from "../models/productModel.js";

export default class ProductDAO {
    getAll = () => {
    return productModel.find();
  };
  getById = (id) => {
    return productModel.findById(id);
  };
  create = (data) => {
    return productModel.create(data);
  };
  update = (id, data) => {
    return productModel.findByIdAndUpdate(id, data, { new: true });
  };
}