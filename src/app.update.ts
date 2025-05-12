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

let todos = [
  {
    id: 1,
    name: "Buy car",
    isCompleted: false,
  },
  {
    id: 2,
    name: "Buy food",
    isCompleted: true,
  },
  {
    id: 3,
    name: "sell toys",
    isCompleted: false,
  },
];

@Update()
export class AppUpdate {
  constructor(@InjectBot() private readonly bot: Telegraf<Context>) {}

  @Start()
  async startCommand(ctx: Context) {
    await ctx.reply("Assalomu alaykum! 👋");
    await ctx.reply("Xo'sh, nima qilishni xohlaysiz?", actionButtons());
  }

  @Hears("Topshiriqlar to'plami 📋")
  async getAllTodos(ctx: Context) {
    await ctx.reply(showList(todos));
  }

  @Hears("Yakunlash ✅")
  async doneTodo(ctx: Context) {
    await ctx.reply("Topshiriq ID sini yuboring: ");
    ctx.session.type = "done";
  }

  @Hears("O'zgartirish ✏️")
  async editTodo(ctx: Context) {
    await ctx.replyWithHTML(
      "Topshiriq ID si va yangi topshiriqni namunadagidek yuboring: \n\n" +
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
    if (!ctx.session.type) return;

    if (ctx.session.type === "done") {
      const todo = todos.find((t) => t.id === +message);

      if (!todo) {
        await ctx.reply("Bunday ID ga ega topshiriq mavjud emas!");
        return;
      }

      todo.isCompleted = true;
      await ctx.reply(showList(todos));
    }

    if (ctx.session.type === "edit") {
      const data = message.split(" | ");
      const todo = todos.find((t) => t.id === +data[0]);

      if (!todo) {
        await ctx.reply("Bunday ID ga ega topshiriq mavjud emas!");
        return;
      }

      todo.name = data[1];
      await ctx.reply(showList(todos));
    }

    if (ctx.session.type === "delete") {
      const todo = todos.find((t) => t.id === +message);

      if (!todo) {
        await ctx.reply("Bunday ID ga ega topshiriq mavjud emas!");
        return;
      }

      todos = todos.filter((todo) => (todo.id !== +message ? todo : null));
      await ctx.reply(showList(todos));
    }
  }
}
