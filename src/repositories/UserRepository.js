export default class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getUserByEmail = (email) => {
    return this.dao.getByEmail(email);
  };

  getUserById = (id) => {
    return this.dao.getById(id);
  };

  createUser = (user) => {
    return this.dao.create(user);
  };

  updateUser = (id, data) => {
    return this.dao.update(id, data);
  };
}