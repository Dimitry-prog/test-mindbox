import { AxiosKnownErrorType, TodoResponseType, TodoType } from "../../types";
import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/constants.ts";

export const getTodos = createAsyncThunk<TodoResponseType, undefined, { rejectValue: string }>(
  'todos/getTodos',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios(`${BASE_URL}/todos.json`);
      return data;
    } catch (e: unknown) {
      if (axios.isAxiosError<AxiosKnownErrorType>(e)) {
        return rejectWithValue(e.message);
      }
      const error = e as string;
      return rejectWithValue(error)
    }
  }
)

export const addTodo = createAsyncThunk<TodoType, string, { rejectValue: string }>(
  'todos/addTodo',
  async (text, { rejectWithValue }) => {
    try {
      const todo: TodoType = {
        id: '3',
        text,
        isDone: false,
      }
      const { data } = await axios.post(`${BASE_URL}/todos.json`, todo);
      console.log(data)
      return data;
    } catch (e: unknown) {
      if (axios.isAxiosError<AxiosKnownErrorType>(e)) {
        return rejectWithValue(e.message);
      }
      const error = e as string;
      return rejectWithValue(error)
    }
  }
)

type TodoState = {
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
      .addCase(getTodos.pending, state => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.status = "success";
        state.error = null;
        state.todos = action.payload.todos;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
      .addCase(addTodo.pending, state => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.status = "success";
        state.error = null;
        state.todos.push(action.payload);
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
  }
});

export const { reducer: todosReducer, actions: todosActions } = todosSlice;