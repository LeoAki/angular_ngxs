import { Todo } from "./todo.interface";

export interface TodoState {
  todos: Todo[];
  loading: boolean;
  error?: string;
}
