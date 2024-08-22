import { Component, inject } from '@angular/core';
import { Todo } from '../../core/interfaces/todo.interface';
import { MatDialog } from '@angular/material/dialog';
import { ModalTodoComponent } from '../../shared/components/modal-todo/modal-todo.component';
import { TodoItemComponent } from '../../shared/components/todo-item/todo-item.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TodoItemComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasksCreated: Todo[] = []
  tasksInProgress: Todo[] = []
  tasksCompleted: Todo[] = []

  readonly dialog = inject(MatDialog);

  ngOnInit(): void { }

  createTodo() {
    const dialogRef = this.dialog.open(ModalTodoComponent, {
      width: '500px',
      height: '400px',
      panelClass: 'my-panel-class',
      data: { titleModal: 'Crear nueva tarea' }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return

    })
  }
}
