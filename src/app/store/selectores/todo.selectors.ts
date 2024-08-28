import { createSelector } from "@ngrx/store";
import { State } from "../../reducers";

// Selector para obtener el estado de los todos
export const selectTodoState = (state: State) => state.todos;

// Selector para obtener el estado de carga
export const selectLoading = createSelector(
    selectTodoState, // Selecciona el estado de los todos
    (state) => state.loading
);

// Selector para obtener los todos pendientes
export const selectTodosPending = createSelector(
    selectTodoState, // Selecciona el estado de los todos
    (state) => state.todos?.filter(todo => todo.status?._id === 1)
);

// Selector para obtener los todos en progreso
export const selectTodosInProgress = createSelector(
    selectTodoState, // Selecciona el estado de los todos
    // Filtra los todos por aquellos que tienen un estado con ID 2 (en progreso)
    (state) => state.todos?.filter(todo => todo.status?._id === 2)
);

// Selector para obtener los todos completados
export const selectTodosDone = createSelector(
    selectTodoState, // Selecciona el estado de los todos
    // Filtra los todos por aquellos que tienen un estado con ID 3 (completados)
    (state) => state.todos?.filter(todo => todo.status?._id === 3)
);

// Selector para obtener el estado de error
export const selectError = createSelector(
    selectTodoState, // Selecciona el estado de los todos
    // Función que devuelve la propiedad `error` del estado de los todos
    (state) => state.error
);
