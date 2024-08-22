export interface Todo {
  _id: string;
  title: string;
  description?: string;
  status: Status;
}

export interface Status {
  _id: number;
  name: string;
}

export interface CreateTodo {
  title: string;
  description?: string;
  statusId: number;
}

export interface UpdateTodo {
  title?: string;
  description?: string;
  statusId?: number;
}
