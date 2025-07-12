import { Module } from "@nestjs/common";
import { AppUpdate } from "./app.update";
import { AppService } from "./app.service";
import { TelegrafModule } from "nestjs-telegraf";
import * as LocalSession from "telegraf-session-local";
import { ConfigModule } from "@nestjs/config";
import { appConfig } from "./config/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TodoEntity } from "./todo.entity";

const sessions = new LocalSession({ database: "session_db.json" });

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [appConfig],
    }),
    TelegrafModule.forRoot({
      middlewares: [sessions.middleware()],
      token: process.env.BOT_TOKEN || "",
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "tg_bot",
      entities: [TodoEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([TodoEntity]),
  ],

  providers: [AppService, AppUpdate],
})
export class AppModule {}
