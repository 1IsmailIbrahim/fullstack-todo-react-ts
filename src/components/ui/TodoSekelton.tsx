const TodoSekelton = () => {
  return (
    <div
      role="status"
      className="max-w-5xl p-4 mb-7 mt-0 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="h-3 bg-gray-300 rounded-full dark:bg-gray-400 w-24 mb-2.5"></div>
          <div className="w-60 h-2.5 bg-gray-200 rounded-full dark:bg-gray-400"></div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-16 h-9 bg-gray-300 rounded-md dark:bg-gray-500 "></div>
          <div className="w-20 h-9 bg-gray-300 rounded-md dark:bg-gray-500"></div>
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default TodoSekelton;
