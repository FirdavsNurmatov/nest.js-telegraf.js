import { Module } from "@nestjs/common";
import { AppUpdate } from "./app.update";
import { AppService } from "./app.service";
import { TelegrafModule } from "nestjs-telegraf";
import * as LocalSession from "telegraf-session-local";
import { ConfigModule, ConfigService } from "@nestjs/config";
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
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const token = configService.get<string>("BOT_TOKEN");
        if (!token) throw new Error("BOT_TOKEN is not defined in .env");

        const domain = configService.get<string>("WEBHOOK_DOMAIN");
        console.log(domain);
        
        if (!domain) throw new Error("WEBHOOK_DOMAIN is not defined in .env");

        return {
          token,
          middlewares: [sessions.middleware()],
          launchOptions: {
            webhook: {
              domain,
              hookPath: "/webhook",
            },
          },
        };
      },
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "tg_bot",
      entities: [TodoEntity],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([TodoEntity]),
  ],

  providers: [AppService, AppUpdate],
})
export class AppModule {}
