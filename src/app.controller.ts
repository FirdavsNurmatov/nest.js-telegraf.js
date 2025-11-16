import { Controller, Post, Req } from "@nestjs/common";
import { Telegraf } from "telegraf";
import { InjectBot } from "nestjs-telegraf";
import { Context } from "./context.interface";

@Controller()
export class AppController {
  constructor(@InjectBot() private readonly bot: Telegraf<Context>) {}

  @Post("webhook")
  async handleWebhook(@Req() req: any) {
    await this.bot.handleUpdate(req.body);
    return "OK";
  }
}
