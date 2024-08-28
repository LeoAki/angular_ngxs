import { Component, inject } from '@angular/core';
import { Todo } from '../../core/interfaces/todo.interface';
import { MatDialog } from '@angular/material/dialog';
import { ModalTodoComponent } from '../../shared/components/modal-todo/modal-todo.component';
import { TodoItemComponent } from '../../shared/components/todo-item/todo-item.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { createTodoRequest, getTodosRequest } from '../../store/actions/todo.actions';
import { selectTodosDone, selectTodosInProgress, selectTodosPending } from '../../store/selectores/todo.selectors';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TodoItemComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasksCreated: Observable<Todo[]> = new Observable()
  tasksInProgress: Observable<Todo[]> = new Observable()
  tasksCompleted: Observable<Todo[]> = new Observable()

  readonly dialog = inject(MatDialog);
  store = inject(Store<Store>);

  ngOnInit(): void {
    this.store.dispatch(getTodosRequest()) // llama a la acción para obtener los todos
    this.tasksCreated = this.store.select(selectTodosPending) // obtiene los todos pendientes
    this.tasksInProgress = this.store.select(selectTodosInProgress) // obtiene los todos en progreso
    this.tasksCompleted = this.store.select(selectTodosDone) // obtiene los todos completados
  }

  createTodo() {
    const dialogRef = this.dialog.open(ModalTodoComponent, {
      width: '500px',
      height: '400px',
      panelClass: 'my-panel-class',
      data: { titleModal: 'Crear nueva tarea' }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return
      this.store.dispatch(createTodoRequest({todo: result}));
    })
  }
}
