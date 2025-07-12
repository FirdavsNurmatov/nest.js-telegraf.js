import { Markup } from "telegraf";

export function actionButtons(): ReturnType<typeof Markup.keyboard> {
  return Markup.keyboard([
    ["Topshiriqlar to'plami 📋"],
    ["Yaratish 📝", "Yakunlash ✅"],
    ["O'zgartirish ✏️", "O'chirish ❌"],
  ]).resize();
}
