import { ChangeDetectionStrategy, Component, inject, model } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Todo } from '../../../core/interfaces/todo.interface';
import { CommonModule } from '@angular/common';
import { ButtonStatusComponent } from '../button-status/button-status.component';
import { MatIconModule } from '@angular/material/icon';
import { ModalTodoComponent } from '../modal-todo/modal-todo.component';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [
    CommonModule,
    ButtonStatusComponent,
    MatIconModule
  ],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemComponent {

  tasks = model<any[]>();
  title = model<string>();
  readonly dialog = inject(MatDialog);

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

  updateStatus(nuevoEstado: number, id: string) {}

}
