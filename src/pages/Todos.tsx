import Paginator from "../components/ui/Paginator";
import useCustomQuery from "../hooks/useCustomQuery";

const TodosPage = () => {
  const storageKey = "userData";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null;

  const { isLoading, data } = useCustomQuery({
    url: "/todos",
    queryKey: ["PaginatedTodos"],
    config: {
      headers: {
        Authorization: `Bearer ${userData.jwt}`,
      },
    },
  });

  if (isLoading)
    return (
      <div className="bg-slate-200 rounded-md p-7 space-y-5 mt-6">
        <div className="h-3 bg-gray-300 rounded-full dark:bg-gray-400 w-72 mb-2.5"></div>
        <div className="w-full h-2.5 bg-gray-200 rounded-full dark:bg-gray-400"></div>
      </div>
    );

  let i = 1;
  return (
    <div className="space-y-1 max-w-5xl mx-auto rounded-md bg-gray-800 text-white p-4 mb-7 mt-0">
      {data.data.length ? (
        data.data.map(
          ({
            id,
            attributes,
          }: {
            id: number;
            attributes: { title: string; description: string };
          }) => (
            <div
              key={id}
              className="flex items-center justify-between hover:bg-gray-600 duration-300 p-3 rounded-md even:text-blue-500 even:bg-gray-600"
            >
              <div>
                <p className="w-full font-semibold">
                  {i++} - {attributes.title}
                </p>
                <span className="block w-full py-1 text-sm text-slate-300">
                  {attributes.description}
                </span>
              </div>
            </div>
          )
        )
      ) : (
        <h3 className="w-full font-semibold p-3 rounded-md even:bg-gray-600">
          No todos yet
        </h3>
      )}
      <Paginator />
    </div>
  );
};

export default TodosPage;