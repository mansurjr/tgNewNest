import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserModule } from "./user/user.module";
import { BotModule } from "./bot/bot.module";
import { SessionsModule } from "./sessions/sessions.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }),
    SequelizeModule.forRoot({
      uri: process.env.db_uri,
      autoLoadModels: true,
      synchronize: true,
      logging: false,
    }),
    UserModule,
    BotModule,
    SessionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
