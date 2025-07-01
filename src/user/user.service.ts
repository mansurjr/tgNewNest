import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./model/user.model";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private readonly UserModel: typeof User) {}
  getAll() {
    return this.UserModel.findAll({ include: { all: true } });
  }
  getOne(id: number) {
    return this.UserModel.findOne({ where: { id }, include: { all: true } });
  }
  create(user: CreateUserDto) {
    user.password = bcrypt.hashSync(user.password, 7);
    return this.UserModel.create(user);
  }
  update(id: number, user: UpdateUserDto) {
    return this.UserModel.update(user, { where: { id } });
  }
  delete(id: number) {
    return this.UserModel.destroy({ where: { id } });
  }
  getUserByRole(role: string) {
    if (!role) {
      return this.UserModel.findAll({
        where: { role },
        include: { all: true },
      });
    }
    if (!["admin", "teacher", "sales"].includes(role)) {
      throw new NotFoundException("This role does not exist");
    }
    return this.UserModel.findAll({ where: { role }, include: { all: true } });
  }
}
