const App = () => {
  const active = true;

  return (
    <div className="grid place-content-center">
      <h1 className="mb-4 text-4xl text-orange-300/80 dark:text-orange-200/50 font-thin italic text-center">todos</h1>
      <div
        className="w-full sm:min-w-[500px] border-gray-200 dark:border-gray-500 border rounded-sm shadow-2xl dark:shadow-gray-200/10">
        <form className="p-2 text-lg font-thin text-black/50 dark:text-white/50 border-b-2  dark:border-gray-500">
          <input
            type="text"
            placeholder="What needs to be done?"
            className="w-full p-2 text-black dark:text-white rounded-md outline-none border-none bg-transparent focus:ring-orange-200 dark:focus:ring-orange-200/50 focus:ring-1"
          />
        </form>
        <div className="p-2 flex gap-2 items-center border-b dark:border-gray-500">
          <label className="w-6 h-6">
            <input type="checkbox" value="" className="hidden peer"/>
            <span
              className={`p-3 inline-flex border border-gray-200 dark:border-gray-400 rounded-full cursor-pointer peer-checked:ring-gray-500 dark:peer-checked:ring-gray-700 peer-checked:ring-1 peer-checked:border-transparent ${active && "bg-[url('./assets/done.svg')] bg-no-repeat bg-cover bg-center"}`}/>
          </label>
          <p
            className={`w-full p-2 text-black dark:text-white rounded-md outline-none border-none bg-transparent focus:ring-orange-200 dark:focus:ring-orange-200/50 focus:ring-1 ${active && "line-through opacity-30"}`}
          >
            test
          </p>
        </div>
        <div className="p-2 flex gap-2 items-center border-b dark:border-gray-500">
          <label className="w-6 h-6">
            <input type="checkbox" value="" className="hidden peer"/>
            <span
              className={`p-3 inline-flex border border-gray-200 dark:border-gray-400 rounded-full cursor-pointer peer-checked:ring-gray-500 dark:peer-checked:ring-gray-700 peer-checked:ring-1 peer-checked:border-transparent ${active && "bg-[url('./assets/done.svg')] bg-no-repeat bg-cover bg-center"}`}/>
          </label>
          <p
            className={`w-full p-2 text-black dark:text-white rounded-md outline-none border-none bg-transparent focus:ring-orange-200 dark:focus:ring-orange-200/50 focus:ring-1 ${active && ""}`}
          >
            test v2
          </p>
        </div>
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