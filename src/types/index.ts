export type TodoType = {
  id: string,
  text: string,
  isDone: boolean,
}

export type TodoResponseType = {
  todos: TodoType[]
}

export type AxiosKnownErrorType = {
  message: string;
};