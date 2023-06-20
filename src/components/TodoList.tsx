import { useAppSelector } from "../hook/reduxHooks.ts";
import TodoItem from "./TodoItem.tsx";

const TodoList = () => {
  const todos = useAppSelector(state => state.todos.todos);
  const status = useAppSelector(state => state.todos.status);
  const error = useAppSelector(state => state.todos.error);

  if (status === "loading") {
    return <h3 className="mt-2 text-lg text-center">LOADING...</h3>
  }

  if (error) {
    return <h3 className="mt-2 text-lg text-center text-red-500">{error}</h3>
  }

  return (
    <ul className="flex flex-col gap-2">
      {todos.map(item => (
        <li key={item.id}>
          <TodoItem isDone={item.isDone} text={item.text}/>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;