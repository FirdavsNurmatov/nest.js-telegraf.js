import { registerAs } from "@nestjs/config";

export interface AppConfigI {
  PORT: number;
  BOT_TOKEN: string;
  ADMIN_ID: number;
  WEBHOOK_DOMAIN: string;
}

export const appConfig = registerAs<AppConfigI>(
  "app",
  (): AppConfigI => ({
    PORT: +(process.env.PORT || 3000),
    BOT_TOKEN: process.env.BOT_TOKEN || "not_found",
    ADMIN_ID: +(process.env.ADMIN_ID || 0),
    WEBHOOK_DOMAIN: process.env.WEBHOOK_DOMAIN || "not_found",
  }),
);
