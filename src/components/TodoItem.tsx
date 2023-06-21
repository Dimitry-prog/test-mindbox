import { useAppDispatch } from "../hook/reduxHooks.ts";
import { toggleStatusIsDone } from "../store/slices/todosSlice.ts";

type TodoItemProps = {
  id: number,
  isDone: boolean,
  text: string,
}

const TodoItem = ({ id, isDone, text }: TodoItemProps) => {
  const dispatch = useAppDispatch();

  const handleToggleStatusIsDone = () => {
    dispatch(toggleStatusIsDone({
      id,
      isDone: !isDone
    }));
  }

  return (
    <div className="p-2 flex gap-2 items-center border-b dark:border-gray-500">
      <label className="w-6 h-6">
        <input
          onChange={handleToggleStatusIsDone}
          type="checkbox"
          checked={isDone}
          className="hidden peer"
        />
        <span
          className={`p-3 inline-flex border border-gray-200 dark:border-gray-400 rounded-full cursor-pointer peer-checked:ring-gray-500 dark:peer-checked:ring-gray-700 peer-checked:ring-1 peer-checked:border-transparent ${isDone && "bg-[url('./assets/done.svg')] bg-no-repeat bg-cover bg-center"}`}/>
      </label>
      <p
        className={`w-full p-2 text-black dark:text-white rounded-md outline-none border-none bg-transparent focus:ring-orange-200 dark:focus:ring-orange-200/50 focus:ring-1 ${isDone && "line-through opacity-30"}`}
      >
        {text}
      </p>
    </div>
  );
};

export default TodoItem;