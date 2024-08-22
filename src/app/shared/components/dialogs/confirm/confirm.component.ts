import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.css'
})
export class ConfirmComponent {
  readonly dialogRef = inject(MatDialogRef<ConfirmComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
}
