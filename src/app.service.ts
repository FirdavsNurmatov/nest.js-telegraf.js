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

  async getAllTodos() {
    return await this.todoRepository.find({ order: { id: "ASC" } });
  }

  async getTodoById(id: number) {
    return await this.todoRepository.findOneBy({ id });
  }

  async createTodo(name: string) {
    const newTodo = this.todoRepository.create({ name });
    return await this.todoRepository.save(newTodo);
  }

  async doneTodo(id: number) {
    const todo = await this.getTodoById(id);
    if (!todo) return null;

    todo.isCompleted = !todo.isCompleted;
    return await this.todoRepository.save(todo);
  }

  async editTodo(id: number, name: string) {
    const todo = await this.getTodoById(id);
    if (!todo) return null;

    todo.name = name;
    return await this.todoRepository.save(todo);
  }

  async deleteTodo(id: number) {
    const todo = await this.getTodoById(id);
    if (!todo) return null;

    return await this.todoRepository.delete({ id });
  }
}
