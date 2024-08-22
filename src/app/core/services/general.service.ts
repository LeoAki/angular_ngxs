import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GenericInformationComponent } from '../../shared/components/dialogs/generic-information/generic-information.component';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor() { }
  readonly dialog = inject(MatDialog);

  openDialogGeneric(title: string, logo: string, color: string) {
    const dialogRef = this.dialog.open(GenericInformationComponent, {
      width: '350px',
      data: { title: title, logo: logo, color: color }
    });
    setTimeout(() => {
      dialogRef.close();
    }, 2000);
  }

}
