import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch } from "../hook/reduxHooks.ts";
import { addTodo } from "../store/slices/todosSlice.ts";

const AddTodo = () => {
  const [text, setText] = useState<string>('');
  const dispatch = useAppDispatch();

  const handleAddNewTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addTodo(text));
    setText('');
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }

  return (
    <form
      onSubmit={handleAddNewTodo}
      className="p-2 text-lg font-thin text-black/50 dark:text-white/50 border-b-2  dark:border-gray-500"
    >
      <input
        value={text}
        onChange={handleChange}
        type="text"
        placeholder="What needs to be done?"
        className="w-full p-2 text-black dark:text-white rounded-md outline-none border-none bg-transparent focus:ring-orange-200 dark:focus:ring-orange-200/50 focus:ring-1"
      />
    </form>
  );
};

export default AddTodo;