import { Controller, Post, Req } from "@nestjs/common";
import { Telegraf } from "telegraf";

@Controller()
export class AppController {
  constructor(private readonly bot: Telegraf) {}

  @Post("webhook")
  async handleWebhook(@Req() req: any) {
    await this.bot.handleUpdate(req.body);
    return "OK";
  }
}
