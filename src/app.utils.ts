type Todos = {
  id: number;
  name: string;
  isCompleted: boolean;
  created_at: Date;
  updated_at: Date;
};

export const showList = (todos: Todos[]) =>
  `Sizning topshiriqlar to'plamingiz:\n\n${todos.map((todo) => `Yaratilgan vaqti: ${todo.created_at.toLocaleString("uz-UZ")}\n` + todo.id + ". " + (todo.isCompleted ? "✅" : "🔘") + " " + todo.name + "\n\n").join("")}`;
