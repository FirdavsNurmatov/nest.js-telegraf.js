import { Module } from "@nestjs/common";
import { AppUpdate } from "./app.update";
import { AppService } from "./app.service";
import { TelegrafModule } from "nestjs-telegraf";
import * as LocalSession from "telegraf-session-local";
import { ConfigModule } from "@nestjs/config";
import { appConfig } from "./config/config";

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
    // TelegrafModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     token: configService.get<string>('app.BOT_TOKEN'),
    //     middlewares: [sessions.middleware()],
    //   }),
    //   inject: [ConfigService],
    // }),
  ],
  providers: [AppService, AppUpdate],
})
export class AppModule {}
