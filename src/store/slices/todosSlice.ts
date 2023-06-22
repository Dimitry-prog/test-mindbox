import { TodoType, TodoUpdateIsDone } from "../../types";
import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL_TODOS, BASE_URL_TODOS_BY_ID } from "../../utils/constants.ts";
import { handleRequest } from "../../api/api.ts";
import { getRandomInt } from "../../utils/getRandomInt.ts";

export const getTodos = createAsyncThunk<TodoType[], void, { rejectValue: string }>(
  'todos/getTodos',
  async (_, { rejectWithValue }) => {
    const request = axios(BASE_URL_TODOS);
    return handleRequest(request, rejectWithValue)
  }
)

export const addTodo = createAsyncThunk<TodoType, string, { rejectValue: string }>(
  'todos/addTodo',
  async (text, { rejectWithValue }) => {
    const todo: TodoType = {
      id: getRandomInt(1, 1000000000),
      text,
      isDone: false,
    }
    const request = axios.post(BASE_URL_TODOS, todo);
    return handleRequest(request, rejectWithValue)
  }
)

export const deleteTodo = createAsyncThunk<TodoType, number, { rejectValue: string }>(
  'todos/deleteTodo',
  async (id, { rejectWithValue }) => {
    const request = axios.delete(BASE_URL_TODOS_BY_ID(id));
    return handleRequest(request, rejectWithValue)
  }
)

export const toggleStatusIsDone = createAsyncThunk<TodoType, TodoUpdateIsDone, {
  rejectValue: string
}>(
  'todos/toggleStatusIsDone',
  async (data, { rejectWithValue }) => {
    const request = axios.patch(BASE_URL_TODOS_BY_ID(data.id), data);
    return handleRequest(request, rejectWithValue)
  }
)

export type TodoState = {
  todos: TodoType[],
  status: "init" | "loading" | "success" | "error";
  error: string | null | undefined;
}

const initialState: TodoState = {
  todos: [],
  status: "init",
  error: null
}

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<TodoState>) => {
    builder
      .addCase(getTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
      })
      .addCase(toggleStatusIsDone.fulfilled, (state, action) => {
        const todo = state.todos.find(todo => todo.id === action.payload.id);
        if (todo) {
          todo.isDone = !todo.isDone;
        }
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.status = 'loading';
          state.error = null;
        },
      )
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state) => {
          state.status = 'success'
          state.error = null;
        },
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.status = 'error'
          state.error = action.payload;
        },
      )
  }
});

export const { reducer: todosReducer, actions: todosActions } = todosSlice;