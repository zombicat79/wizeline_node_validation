import { CreateTodo, Todo } from "./todo";

export interface TodoRepository {
    getAll(): Promise<Todo[]>
    create(data: CreateTodo): Promise<Todo>
    getTodo(id: string): Promise<Todo>
}
