export type TodoType = {
  id: number,
  text: string,
  isDone: boolean,
}

export type TodoResponseType = {
  todos: TodoType[]
}

export type AxiosKnownErrorType = {
  message: string;
};

export type TodoUpdateIsDone = Omit<TodoType, "text">;