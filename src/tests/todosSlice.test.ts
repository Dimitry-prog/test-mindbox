import { getTodos, todosReducer, TodoState } from "../store/slices/todosSlice.ts";

const initialState: TodoState = {
  todos: [],
  status: "init",
  error: null
};

describe('todosSlice', () => {
  it('should change status getTodos.pending', () => {
    const state = todosReducer(initialState, getTodos.pending);
    expect(state.status).toBe('loading');
    expect(state.error).toBeNull();
  });

  it('should change status getTodos.fulfilled', () => {
    const todos = [{ "id": 962175991, "text": "4568", "isDone": true }]
    const action = {
      type: getTodos.fulfilled.type,
      payload: todos
    }
    const state = todosReducer(initialState, action);
    expect(state.todos).toBe(todos)
    expect(state.status).toBe('success');
    expect(state.error).toBeNull();
  });

  it('should change status getTodos.rejected', () => {
    const state = todosReducer(initialState, getTodos.rejected);
    expect(state.status).toBe('error');
    expect(state.error).toBe(undefined)
  });
});