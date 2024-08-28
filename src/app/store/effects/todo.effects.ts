import { inject, Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { createTodoRequest, createTodoSuccess, getTodosRequest, getTodosSuccess, todosError, updateTodoRequest, updateTodoSuccess } from "../actions/todo.actions"
import { catchError, exhaustMap, map } from "rxjs"
import { TodoService } from "../../core/services/todo.service"
import { GeneralService } from "../../core/services/general.service"

@Injectable()
export class TodosEffects {

  actions$ = inject(Actions);
  todoService = inject(TodoService);
  generalService = inject(GeneralService);

    createTodo$ = createEffect(() => this.actions$.pipe(
        ofType(createTodoRequest), // Se escucha la acción createTodoRequest y esto desencadena el flujo
        //exhaustMap evita las peticiones duplicadas
        exhaustMap((action) =>  //Las action son los datos que se envían en la acción
            this.todoService.createTodo(action.todo) // Se envía el todo proveniente de la acción al servicio
            .pipe(
                map((resp: any) => {
                    // Se retorna la acción createTodoSuccess con el TODO creado por un payload
                    return createTodoSuccess({ todo: resp })
                }),
                catchError(() => {
                    // Se retorna la acción todosError con un error en caso de que la petición falle
                    this.generalService.openDialogGeneric('Error al crear el TODO', 'fa-solid fa-xmark', 'text-red-500')
                    return [todosError({ error: 'Error al crear el TODO' })]
                })
            )
        )
    ))

    loadTodos$ = createEffect(() => this.actions$.pipe(
        ofType(getTodosRequest), // Se escucha la acción getTodosRequest y esto desencadena el flujo
        //exhaustMap evita las peticiones duplicadas
        exhaustMap(() =>
            this.todoService.getTodos() // Se obtienen los TODOS
                .pipe( // se tratan los datos obtenidos
                    map((resp: any) => {
                        // Se retorna la acción getTodosSuccess con los TODOS obtenidos
                        return getTodosSuccess({ todos: resp })
                    }),
                    catchError((err) => {
                        this.generalService.openDialogGeneric('Error al obtener los TODOS', 'fa-solid fa-xmark', 'text-red-500')
                        // Se retorna la acción getTodosError con un error en caso de que la petición falle
                        return [todosError({ error: 'Error al obtener los TODOS' })]
                    })
                )
        )
    ))

    updateTodo$ = createEffect(() => this.actions$.pipe(
      ofType(updateTodoRequest), // Se escucha la acción getTodosRequest y esto desencadena el flujo
      exhaustMap((action) => //exhaustMap se usa para evitar que se hagan peticiones duplicadas
          this.todoService.updateTodo(action._id, action.todo) // Se llama al servicio
              .pipe( // se tratan los datos obtenidos
                  map((resp: any) => {
                      return updateTodoSuccess({ todo: resp })
                  }),
                  catchError(() => {
                      this.generalService.openDialogGeneric('Error al actualizar el TODO', 'fa-solid fa-xmark', 'text-red-500')
                      // Se retorna la acción getTodosError con un error en caso de que la petición falle
                      return [todosError({ error: 'Error al actualizar el TODO' })]
                  })
              )
      )

  ))
}
