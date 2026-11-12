import z from "zod";
import { createTodoSchema, Todo } from "../domain/todo";
import { TodoRepository } from "../domain/todo-repository";
import { ApiError } from "../../server/http/api-error";

export class TodoService {
    constructor(private readonly repository: TodoRepository) {}

    getAll(): Promise<Todo[]> {
        return this.repository.getAll()
    }

    async getTodo(id: string): Promise<Todo>{
        const myTodo = await this.repository.getTodo(id);
        if (!myTodo) {
            throw new ApiError("Not found", 404, `${id} does not exist`);
        }
        return myTodo; 
    }

    create(input: unknown): Promise<Todo> {
        const parsed = createTodoSchema.safeParse(input)

        if (!parsed.success) {
            throw new ApiError(
                'Invalid data',
                400,
                z.flattenError(parsed.error),
                { cause: parsed.error },
            )
        }

        return this.repository.create(parsed.data)
    }
}
