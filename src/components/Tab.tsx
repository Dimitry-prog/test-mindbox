import { twMerge } from "tailwind-merge";

type TabProps = {
  text: string;
  onClick: () => void;
  activeTab: boolean;
}

const Tab = ({ text, onClick, activeTab }: TabProps) => {
  return (
    <button
      onClick={onClick}
      type="button"
      aria-label="all"
      className={twMerge(`py-1 px-2 rounded-sm border border-transparent ${activeTab && "border-orange-200/50"}`)}
    >
      {text}
    </button>

  );
};

export default Tab;