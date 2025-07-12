import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("todo")
export class TodoEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({ type: "text", name: "name" })
  name: string;

  @Column({ type: "boolean", name: "isCompleted", default: false })
  isCompleted: boolean;
}
