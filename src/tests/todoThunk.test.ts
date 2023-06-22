import { TodoType } from "../types";
import { createAsyncThunk } from "@reduxjs/toolkit";


describe('todoThunk', () => {
  it('should getTodos with resolved status', async () => {
    const mockedTodos: TodoType[] = [{ "id": 962175991, "text": "4568", "isDone": true }];

    const thunkActionCreator = createAsyncThunk(
      'todos/getTodos',
      async (undefined, { rejectWithValue }) => {
        return mockedTodos
      }
    )
    const dispatchMock = vi.fn();
    const thunkFunction = thunkActionCreator()

    const thunkPromise = thunkFunction(dispatchMock, () => {
    }, undefined)
    await thunkPromise

    const { calls } = dispatchMock.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe('todos/getTodos/pending')
    expect(end[0].type).toBe('todos/getTodos/fulfilled')
    expect(end[0].payload).toBe(mockedTodos)
  })

  it('should getTodos with rejectWithValue error', async () => {
    const error = 'Something wrong';

    const thunkActionCreator = createAsyncThunk(
      'todos/getTodos',
      async (undefined, { rejectWithValue }) => {
        return rejectWithValue(error)
      }
    )
    const dispatchMock = vi.fn();
    const thunkFunction = thunkActionCreator()

    try {
      const thunkPromise = thunkFunction(dispatchMock, () => {
      }, undefined)
      await thunkPromise
    } catch (e) {

    }

    expect(dispatchMock).toHaveBeenCalledTimes(2)
    const { calls } = dispatchMock.mock;
    expect(calls).toHaveLength(2);
    expect(calls[1][0].type).toBe('todos/getTodos/rejected');
    expect(calls[1][0].payload).toBe(error);
    expect(calls[1][0].meta.rejectedWithValue).toBe(true);
  })
});