type Todos = {
  id: number;
  isCompleted: boolean;
  name: string;
};

export const showList = (todos: Todos[]) =>
  `Sizning topshiriqlar to'plamingiz:\n\n${todos.map((todo) => todo.id + ". " + (todo.isCompleted ? "✅" : "🔘") + " " + todo.name + "\n\n").join("")}`;
