import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from "sequelize-typescript";

@Table({ tableName: "session", timestamps: true, createdAt: false })
export class Session extends Model<Session> {
  @PrimaryKey
  @Column(DataType.BIGINT)
  declare chatId: number;

  @Column(DataType.JSON)
  declare data: Record<string, any>;

  @UpdatedAt
  @Column(DataType.DATE)
  declare updatedAt: Date;
}
