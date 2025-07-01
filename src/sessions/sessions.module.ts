import { Module } from "@nestjs/common";
import { SessionService } from "./session.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Session } from "./session.model";

@Module({
  providers: [SessionService],
  exports: [SessionService],
  imports: [SequelizeModule.forFeature([Session])], 
})
export class SessionsModule {}