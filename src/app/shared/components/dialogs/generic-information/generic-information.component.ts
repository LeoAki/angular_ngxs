import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-generic-information',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './generic-information.component.html',
  styleUrl: './generic-information.component.css'
})
export class GenericInformationComponent {
  readonly dialogRef = inject(MatDialogRef<GenericInformationComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
}
