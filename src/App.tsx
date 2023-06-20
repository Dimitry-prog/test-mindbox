import AddTodo from "./components/AddTodo.tsx";
import { useEffect } from "react";
import { useAppDispatch } from "./hook/reduxHooks.ts";
import { getTodos } from "./store/slices/todosSlice.ts";
import TodoList from "./components/TodoList.tsx";

const App = () => {
  const dispatch = useAppDispatch();
  const active = true;

  useEffect(() => {
    dispatch(getTodos());
  }, []);

  return (
    <div className="grid place-content-center">
      <h1 className="mb-4 text-4xl text-orange-300/80 dark:text-orange-200/50 font-thin italic text-center">todos</h1>
      <div
        className="w-full sm:min-w-[500px] border-gray-200 dark:border-gray-500 border rounded-sm shadow-2xl dark:shadow-gray-200/10">
        <AddTodo/>
        <TodoList/>
        <div className="p-2 flex items-center justify-between gap-2 text-sm text-black/80 dark:text-white/80">
          <p>2 items left</p>
          <div className="flex gap-2 justify-between">
            <button type="button" aria-label="all"
                    className={`py-1 px-2 rounded-sm border ${active && "border-orange-200/50"}`}>
              All
            </button>
            <button type="button" aria-label="active">
              Active
            </button>
            <button type="button" aria-label="completed">
              Completed
            </button>
          </div>
          <button type="button" aria-label="clear completed">
            Clear completed
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;