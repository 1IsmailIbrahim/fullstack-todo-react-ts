import { useState } from "react";
import Paginator from "../components/ui/Paginator";
import useCustomQuery from "../hooks/useCustomQuery";

const TodosPage = () => {
  const storageKey = "userData";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const [page, setPage] = useState<number>(1);

  const { isLoading, data } = useCustomQuery({
    url: `/todos?pagination[pageSize]=${50}&pagination[page]=${page}`,
    queryKey: ["PaginatedTodos", `${page}`],
    config: {
      headers: {
        Authorization: `Bearer ${userData.jwt}`,
      },
    },
  });

  // ** Handler
  const onClickPrev = () => {
    setPage((prev) => prev - 1);
  };
  const onClickNext = () => {
    setPage((prev) => prev + 1);
  };

  if (isLoading)
    return (
      <div className="bg-slate-200 rounded-md p-7 space-y-5 mt-6 max-w-4xl mx-auto">
        <div className="h-3 bg-gray-300 rounded-full dark:bg-gray-400 w-72 mb-2.5"></div>
        <div className="w-full h-2.5 bg-gray-200 rounded-full dark:bg-gray-400"></div>
      </div>
    );

  let i = 1;
  return (
    <div className="mb-7 max-w-3xl mx-auto rounded-md bg-gray-800 text-white p-4 mt-0">
      <div className="mb-5 space-y-1">
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
      </div>
      <Paginator
        page={page}
        pageCount={3}
        onClickPrev={onClickPrev}
        onClickNext={onClickNext}
      />
    </div>
  );
};

export default TodosPage;
