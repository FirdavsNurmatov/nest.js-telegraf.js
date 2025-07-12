import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TodoEntity } from "./todo.entity";
import { Repository } from "typeorm";

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  async getAllTodos(user_id: string) {
    return await this.todoRepository.find({
      where: { user_id: user_id },
      order: { id: "ASC" },
    });
  }

  async getTodoById(id: number, user_id: string) {
    return await this.todoRepository.findOneBy({ id, user_id });
  }

  async createTodo(data: { user_id: string; message: string }) {
    const userAllTodos = await this.getAllTodos(data.user_id);

    const newTodo = this.todoRepository.create({
      id: userAllTodos.length + 1,
      user_id: data.user_id,
      name: data.message,
    });
    return await this.todoRepository.save(newTodo);
  }

  async doneTodo(id: number, user_id: string) {
    const todo = await this.getTodoById(id, user_id);
    if (!todo) return null;

    todo.isCompleted = !todo.isCompleted;
    return await this.todoRepository.save(todo);
  }

  async editTodo(id: number, name: string, user_id: string) {
    const todo = await this.getTodoById(id, user_id);
    if (!todo) return null;

    todo.name = name;
    return await this.todoRepository.save(todo);
  }

  async deleteTodo(id: number, user_id: string) {
    const todo = await this.getTodoById(id, user_id);
    if (!todo) return null;

    return await this.todoRepository.delete({ id });
  }
}
