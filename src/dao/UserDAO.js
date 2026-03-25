import userModel from "../models/userModel.js";

export default class UserDAO {

  getByEmail = (email) => {
    return userModel.findOne({ email });
  };

  getById = (id) => {
    return userModel.findById(id);
  };

  create = (user) => {
    return userModel.create(user);
  };

  update = (id, data) => {
    return userModel.findByIdAndUpdate(id, data, { new: true });
  };
}