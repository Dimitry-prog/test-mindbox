import AddTodo from "./components/AddTodo.tsx";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./hook/reduxHooks.ts";
import { deleteTodo, getTodos } from "./store/slices/todosSlice.ts";
import TodoList from "./components/TodoList.tsx";
import { TodoType } from "./types";
import Tabs from "./components/Tabs.tsx";

const App = () => {
  const todos = useAppSelector(state => state.todos.todos);
  const [renderedTodos, setRenderedTodos] = useState<TodoType[]>([]);
  const [itemsLeft, setItemsLeft] = useState<number>(0);
  const dispatch = useAppDispatch();

  const handleDeleteAllCompletedTodos = async () => {
    const completedTodos = todos.filter(elem => elem.isDone);
    for (const todo of completedTodos) {
      await dispatch(deleteTodo(todo.id));
    }
    dispatch(getTodos());
  }

  useEffect(() => {
    dispatch(getTodos());
  }, []);

  useEffect(() => {
    setRenderedTodos(todos)
    setItemsLeft(todos.filter(elem => !elem.isDone).length)
  }, [todos])

  return (
    <div className="grid place-content-center">
      <h1 className="mb-4 text-4xl text-orange-300/80 dark:text-orange-200/50 font-thin italic text-center">todos</h1>
      <div
        className="w-full sm:min-w-[500px] border-gray-200 dark:border-gray-500 border rounded-sm shadow-2xl dark:shadow-gray-200/10">
        <AddTodo/>
        <TodoList renderedTodos={renderedTodos}/>
        <div className="p-2 flex items-center justify-between gap-2 text-sm text-black/80 dark:text-white/80">
          <p>{itemsLeft} items left</p>
          <Tabs todos={todos} setItemsLeft={setItemsLeft} setRenderedTodos={setRenderedTodos}/>
          <button
            onClick={handleDeleteAllCompletedTodos}
            type="button"
            aria-label="clear completed"
          >
            Clear completed
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;