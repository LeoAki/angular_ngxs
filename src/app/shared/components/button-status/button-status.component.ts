import { Component, model, output } from '@angular/core';
import { STATUS_TODO } from '../../../core/const/todos.constant';
import { Status } from '../../../core/interfaces/todo.interface';
import { CommonModule } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-buttons-status',
  standalone: true,
  imports: [
    CommonModule, MatMenuModule
  ],
  templateUrl: './button-status.component.html',
  styleUrl: './button-status.component.css',
})
export class ButtonStatusComponent {
  currentState = model<Status>();
  newState = output<number>();
  statuses = Object.values(STATUS_TODO)

  constructor() { }

  ngOnInit(): void { }

  changeState(_id: number, newState: string) {
    this.currentState.set({_id, name: newState})
    this.newState.emit(_id)
  }

  // This function changes style of the background color style of the button
  getStatusClass(): string {
    const selectedStatus = this.statuses.find(status => status?.id === this.currentState()?._id)
    return (selectedStatus ? selectedStatus.bgColor : '')
  }
}
