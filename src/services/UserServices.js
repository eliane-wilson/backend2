import { createHash, isValidPassword } from "../utils/bcrypt.js";

export default class UserService {
  constructor(repository) {
    this.repository = repository;
  }

  registerUser = async (data) => {
    const exists = await this.repository.getUserByEmail(data.email);

    if (exists) {
      throw new Error("Usuario ya existe");
    }

    data.password = createHash(data.password);

    return this.repository.createUser(data);
  };

  loginUser = async (email, password) => {
    const user = await this.repository.getUserByEmail(email);

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    if (!isValidPassword(user, password)) {
      throw new Error("Contraseña incorrecta");
    }

    return user;
  };

  getUserByEmail = (email) => {
    return this.repository.getUserByEmail(email);
  };

  updatePassword = async (email, newPassword) => {
    const user = await this.repository.getUserByEmail(email);

    if (!user) throw new Error("Usuario no encontrado");

    if (isValidPassword(user, newPassword)) {
      throw new Error("No podés usar la misma contraseña");
    }

    return this.repository.updateUser(user._id, {
      password: createHash(newPassword)
    });
  };
}