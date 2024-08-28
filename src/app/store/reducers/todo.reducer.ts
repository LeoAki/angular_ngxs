import { createReducer, on } from "@ngrx/store";
import { TodoState } from "../../core/interfaces/todo-state.interface";
import { createTodoRequest, createTodoSuccess, getTodosRequest, getTodosSuccess, todosError, updateTodoRequest, updateTodoSuccess } from "../actions/todo.actions";

export const initialState: TodoState = {
  todos: [],
  loading: false,
  error: ''
};

export const _todoReducer = createReducer(
  initialState,
  on(createTodoRequest, (state) => ({
    ...state,
    loading: true
  })),
  on(createTodoSuccess, (state, { todo }  ) => ({
    ...state,
    todos: [...state.todos || [], todo], // Se agrega el TODO creado al arreglo de TODOS
    loading: false
  })),
  on(getTodosRequest, (state) => ({
    ...state, // Se regresa el mismo estado
    loading: true // Se cambia el estado para indicar que se están cargando los TODOS desde la API
  })),
  on(getTodosSuccess, (state, { todos }) => ({
    ...state, // Se regresa el mismo estado
    todos, // Se actualiza el estado con los TODOS obtenidos
    loading: false // Se cambia el estado para indicar que se terminó de cargar los TODOS desde la API
  })),
  on(todosError, (state, { error }) => ({
    ...state, // Se regresa el mismo estado
    error, // Se actualiza el estado con el error
    loading: false // Se cambia el estado para indicar que se terminó de cargar los TODOS desde la API
  })),
  on(updateTodoRequest, (state) => ({
    ...state,
    loading: true
  })),
  on(updateTodoSuccess, (state, { todo }) => ({
      ...state,
      todos: state.todos?.map(t => t._id === todo._id ? todo : t), // Se actualiza el TODO en el arreglo de TODOS
      loading: false
  })),
)
