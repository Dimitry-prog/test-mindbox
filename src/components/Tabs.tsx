import { Dispatch, SetStateAction, useState } from "react";
import { TABS } from "../utils/constants.ts";
import Tab from "./Tab.tsx";
import { TodoType } from "../types";

type TabsProps = {
  todos: TodoType[];
  setItemsLeft: Dispatch<SetStateAction<number>>;
  setRenderedTodos: Dispatch<SetStateAction<TodoType[]>>
}

const Tabs = ({ todos, setItemsLeft, setRenderedTodos }: TabsProps) => {
  const [activeTab, setActiveTab] = useState<string>(TABS[0])

  const handleTabClick = (btnText: string) => {
    let activeTodos;

    switch (btnText) {
      case 'All':
        setRenderedTodos(todos);
        activeTodos = todos.filter(elem => !elem.isDone);
        break;
      case 'Active':
        activeTodos = todos.filter(elem => !elem.isDone);
        setRenderedTodos(activeTodos);
        break;
      case 'Completed':
        activeTodos = todos.filter(elem => elem.isDone);
        setRenderedTodos(activeTodos);
        break;
      default:
        return;
    }

    setItemsLeft(activeTodos.length);
    setActiveTab(btnText);
  }

  return (
    <ul className="flex gap-2 justify-between">
      {TABS.map(button => (
        <li key={button}>
          <Tab
            key={button}
            text={button}
            onClick={() => handleTabClick(button)}
            activeTab={activeTab === button}
          />
        </li>
      ))}
    </ul>
  );
};

export default Tabs;