import {
  Ctx,
  Hears,
  InjectBot,
  Message,
  On,
  Start,
  Update,
} from "nestjs-telegraf";
import { Telegraf } from "telegraf";
import { actionButtons } from "./app.buttons";
import { Context } from "./context.interface";
import { showList } from "./app.utils";
import { AppService } from "./app.service";

@Update()
export class AppUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly appService: AppService,
  ) {}

  @Start()
  async startCommand(ctx: Context) {
    await ctx.reply("Assalomu alaykum! 👋");
    await ctx.reply("Xo'sh, nima qilishni xohlaysiz?", actionButtons());
    ctx.session.type = "none";
  }

  @Hears("Topshiriqlar to'plami 📋")
  async getAllTodos(ctx: Context) {
    const todos = await this.appService.getAllTodos();

    if (!todos.length) {
      await ctx.reply("Hali hech qanday topshiriq mavjud emas");
    } else await ctx.reply(showList(todos));
  }

  @Hears("Yaratish 📝")
  async createTodo(ctx: Context) {
    await ctx.replyWithHTML("Topshiriq nomini yuboring: ");
    ctx.session.type = "create";
  }

  @Hears("Yakunlash ✅")
  async doneTodo(ctx: Context) {
    await ctx.reply("Topshiriq ID sini yuboring: ");
    ctx.session.type = "done";
  }

  @Hears("O'zgartirish ✏️")
  async editTodo(ctx: Context) {
    await ctx.replyWithHTML(
      "Topshiriq ID va yangi nomni namunadagidek yuboring: \n\n" +
        "Namuna: <b>1 | topshiriq nomi</b>",
    );
    ctx.session.type = "edit";
  }

  @Hears("O'chirish ❌")
  async deleteTodo(ctx: Context) {
    await ctx.reply("Topshiriq ID sini yuboring: ");
    ctx.session.type = "delete";
  }

  @On("text")
  async getTodoId(@Message("text") message: string, @Ctx() ctx: Context) {
    if (ctx.session.type === "none") {
      await ctx.reply("Assalomu alaykum! 👋");
      await ctx.reply("Xo'sh, nima qilishni xohlaysiz?", actionButtons());
      return;
    }

    if (ctx.session.type === "create") {
      const todo = await this.appService.createTodo(message);
    } else if (ctx.session.type === "done") {
      const todo = await this.appService.doneTodo(+message);

      if (!todo) {
        await ctx.reply("Bunday ID ga ega topshiriq mavjud emas!");
        return;
      }

      todo.isCompleted = true;
    } else if (ctx.session.type === "edit") {
      const data = message.split(" | ");
      const todo = await this.appService.editTodo(+data[0], data[1]);

      if (!todo) {
        await ctx.reply("Bunday ID ga ega topshiriq mavjud emas!");
        return;
      }
    } else if (ctx.session.type === "delete") {
      const todo = await this.appService.deleteTodo(+message);

      if (!todo) {
        await ctx.reply("Bunday ID ga ega topshiriq mavjud emas!");
        return;
      }
    }
    const todos = await this.appService.getAllTodos();
    await ctx.reply(showList(todos));
  }
}
