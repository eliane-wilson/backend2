import cartModel from "../models/cartModel.js";

export default class CartDAO {
  getCartById = (id) => {
    return cartModel.findById(id).populate("products.product");
  };

  create = () => {
    return cartModel.create({ products: [] });
  };

  update = (id, data) => {
    return cartModel.findByIdAndUpdate(id, data, { new: true });
  };
}