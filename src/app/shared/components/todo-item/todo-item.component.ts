import { ChangeDetectionStrategy, Component, inject, Input, model, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Todo } from '../../../core/interfaces/todo.interface';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ButtonStatusComponent } from '../button-status/button-status.component';
import { MatIconModule } from '@angular/material/icon';
import { ModalTodoComponent } from '../modal-todo/modal-todo.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { updateTodoRequest } from '../../../store/actions/todo.actions';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [
    CommonModule,
    ButtonStatusComponent,
    MatIconModule,
    AsyncPipe
  ],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemComponent {

  @Input() tasks: Observable<Todo[]> = new Observable()
  title = model<string>();
  readonly dialog = inject(MatDialog);
  store = inject(Store<Store>);

  editTodoModal(todo: Todo) {
    const dialogRef = this.dialog.open(ModalTodoComponent, {
      width: '500px',
      height: 'auto',
      panelClass: 'my-panel-class',
      data: {
        titleModal: 'Editar tarea',
        modeEdit: true,
        todo
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
    });
  }

  deleteTodo(id: string) {
    const dialogRef = this.dialog.open(ModalTodoComponent, {
      width: '400px',
      height: '200px',
      panelClass: 'my-panel-class',
      data: {
        title: 'Eliminar tarea',
        description: '¿Está seguro que desea eliminar la tarea?',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
    });
  }

  updateStatus(nuevoEstado: number, id: string) {
    this.store.dispatch(updateTodoRequest({ _id: id, todo: { statusId: nuevoEstado } }))
  }

}
