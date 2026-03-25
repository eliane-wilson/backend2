export default class CartRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getCartById = (id) => {
    return this.dao.getCartById(id);
  };

  createCart = () => {
    return this.dao.create();
  };

  updateCart = (id, data) => {
    return this.dao.update(id, data);
  };
}