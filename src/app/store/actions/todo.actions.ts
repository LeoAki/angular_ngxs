import { createAction, props } from "@ngrx/store";
import { CreateTodo, Todo, UpdateTodo } from "../../core/interfaces/todo.interface";


// Acción para iniciar la creación de un nuevo elemento todo
export const createTodoRequest = createAction(
  "[Todo] Create Todo Request",  // Identificador del tipo de acción
  props<{ todo: CreateTodo }>()   // Carga útil que contiene los datos necesarios para crear un nuevo todo
)

// Acción para indicar la creación exitosa de un nuevo elemento todo
export const createTodoSuccess = createAction(
  "[Todo] Create Todo Success",  // Identificador del tipo de acción
  props<{ todo: Todo }>()         // Carga útil que contiene el todo creado
)

// Acción para iniciar la obtención de todos los elementos todo
export const getTodosRequest = createAction(
  "[Todo] Get Todos Request"  // Identificador del tipo de acción
);

// Acción para indicar la obtención exitosa de todos los elementos todo
export const getTodosSuccess = createAction(
  "[Todo] Get Todos Success",  // Identificador del tipo de acción
  props<{ todos: Todo[] }>()    // Carga útil que contiene el array de todos obtenidos
)

// Acción para manejar errores que ocurran durante la obtención de elementos todo
export const todosError = createAction(
  "[Todo] Get Todos Error",    // Identificador del tipo de acción
  props<{ error: string }>()    // Carga útil que contiene el mensaje de error
)

export const updateTodoRequest = createAction(
  "[Todo] Update Todo Request",
  props<{ _id: string, todo: UpdateTodo }>()
)
export const updateTodoSuccess = createAction(
  "[Todo] Update Todo Success",
  props<{ todo: any }>()
)
