import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("todo")
export class TodoEntity {
  @PrimaryColumn({ type: "integer", name: "id" })
  id: number;

  @Column({ type: "varchar", name: "user_id" })
  user_id: string;

  @Column({ type: "text", name: "name" })
  name: string;

  @Column({ type: "boolean", name: "isCompleted", default: false })
  isCompleted: boolean;

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date;
}
