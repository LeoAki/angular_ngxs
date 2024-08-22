import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ButtonStatusComponent } from '../button-status/button-status.component';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-modal-todo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    ButtonStatusComponent
  ],
  templateUrl: './modal-todo.component.html',
  styleUrl: './modal-todo.component.css'
})
export class ModalTodoComponent implements OnInit {

  readonly dialogRef = inject(MatDialogRef<ModalTodoComponent>);
  readonly data = inject<{
    titleModal: string;
    modeEdit: boolean;
    todo: any
    }>(MAT_DIALOG_DATA);

  modeEdit: boolean = this.data.modeEdit || false;
  formTodo: FormGroup = new FormGroup({})
  formChanged: boolean = false;


  ngOnInit(): void {
    this.formTodoGroup();
    this.trackFormChangesInEditMode();
  }

  formTodoGroup(): void {
    this.formTodo = new FormGroup({
      title: new FormControl(this.data?.todo?.title, [Validators.required]),
      description: new FormControl(this.data?.todo?.description),
      statusId: new FormControl(this.data?.todo?.status._id || 1, [Validators.required]),
    });
  }

  trackFormChangesInEditMode(): void {
    if (this.modeEdit) {
      this.formTodo.valueChanges.subscribe((value) => {
        this.formChanged = (
          this.data.todo.title !== value.title ||
          this.data.todo.description !== value.description ||
          this.data.todo.status._id !== value.statusId
        );
      });
    }
  }

  onChangeCurrentState(newState: number): void {
    this.formTodo.patchValue({
      statusId: newState
    });
  }

  saveTodo(): void {
    if (!this.formTodo.valid) return;
    this.dialogRef.close(this.formTodo.value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
