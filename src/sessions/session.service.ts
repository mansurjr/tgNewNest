import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Session } from "./session.model";

@Injectable()
export class SessionService {
  constructor(
    @InjectModel(Session)
    private readonly sessionModel: typeof Session
  ) {}

  async get(chatId: number): Promise<any | undefined> {
    const record = await this.sessionModel.findByPk(chatId);
    return record?.data;
  }

  async set(chatId: number, data: object): Promise<void> {
    await this.sessionModel.upsert({ chatId, data } as Session);
  }

  async update(
    chatId: number,
    dataOrUpdater: object | ((session: any) => object)
  ): Promise<void> {
    const current = (await this.get(chatId)) || {};
    const updated =
      typeof dataOrUpdater === "function"
        ? dataOrUpdater(current)
        : { ...current, ...dataOrUpdater };
    await this.set(chatId, updated);
  }

  async delete(chatId: number): Promise<void> {
    await this.sessionModel.destroy({ where: { chatId } });
  }

  async clearAll(): Promise<void> {
    await this.sessionModel.destroy({ where: {} });
  }
}
