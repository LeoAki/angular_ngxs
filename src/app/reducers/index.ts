import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { _todoReducer } from '../store/reducers/todo.reducer';
import { TodoState } from '../core/interfaces/todo-state.interface';

export interface State {
  todos: TodoState
}

export const reducers: ActionReducerMap<State> = {
  todos: _todoReducer
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
