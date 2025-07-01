import { Column, Model, DataType, Table } from "sequelize-typescript";

interface IUser {
  username: string;
  password: string;
  full_name: string;
  role: "admin" | "teacher" | "salesManager";
  isActive: boolean;
}

@Table({ tableName: "users", timestamps: true })
export class User extends Model<User, IUser> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  declare username: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare password: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare full_name: string;

  @Column({
    type: DataType.ENUM("admin", "teacher", "salesManager"),
    defaultValue: "teacher",
  })
  declare role: "admin" | "teacher" | "salesManager";

  @Column({ type: DataType.STRING, allowNull: true })
  declare telegramId: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare isActive: boolean;
}
