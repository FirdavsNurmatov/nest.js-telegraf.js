import { registerAs } from "@nestjs/config";

export interface AppConfigI {
  PORT: number;
  BOT_TOKEN: string;
}

export const appConfig = registerAs<AppConfigI>(
  "app",
  (): AppConfigI => ({
    PORT: +(process.env.PORT || 3000),
    BOT_TOKEN: process.env.BOT_TOKEN || "not_found",
  }),
);
