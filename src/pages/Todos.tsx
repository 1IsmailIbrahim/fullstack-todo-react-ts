import { ChangeEvent, useState } from "react";
import Paginator from "../components/ui/Paginator";
import useCustomQuery from "../hooks/useCustomQuery";
import Button from "../components/ui/Button";
import axiosInstance from "../config/axios.config";
import { faker } from "@faker-js/faker";

const TodosPage = () => {
  const storageKey = "userData";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("DESC");

  const { isLoading, data, isFetching } = useCustomQuery({
    url: `/todos?pagination[pageSize]=${pageSize}&pagination[page]=${page}&sort=createdAt:${sortBy}`,
    queryKey: [`todos-page-${page}`, `${pageSize}`, `${sortBy}`],
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

  const onChangePageSize = (e: ChangeEvent<HTMLSelectElement>) => {
    setPageSize(+e.target.value);
  };

  const onChangeSortBy = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const onGenerateTodos = async () => {
    //100 record
    for (let i = 0; i < 100; i++) {
      try {
        const { data } = await axiosInstance.post(
          `/todos`,
          {
            data: {
              title: faker.word.words(5),
              description: faker.lorem.paragraph(2),
              user: [userData.user.id],
            },
          },
          {
            headers: {
              Authorization: `Bearer ${userData.jwt}`,
            },
          }
        );
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (isLoading)
    return (
      <div className="bg-slate-200 rounded-md p-7 space-y-5 mt-6 max-w-4xl mx-auto">
        <div className="h-3 bg-gray-300 rounded-full dark:bg-gray-400 w-72 mb-2.5"></div>
        <div className="w-full h-2.5 bg-gray-200 rounded-full dark:bg-gray-400"></div>
      </div>
    );

  return (
    <div className="mb-7 max-w-3xl mx-auto rounded-md bg-gray-800 text-white p-4 mt-0">
      <div className="my-2 flex justify-between">
        <Button variant={"outline"} onClick={onGenerateTodos}>
          Generate todos
        </Button>
        <div className="space-x-2">
          <select
            value={sortBy}
            onChange={onChangeSortBy}
            className="border bg-gray-800 border-white rounded-md p-2"
          >
            <option disabled>Sorted by</option>
            <option value={"ASC"}>Oldest</option>
            <option value={"DESC"}>Latest</option>
          </select>
          <select
            value={pageSize}
            onChange={onChangePageSize}
            className="border bg-gray-800 border-white rounded-md p-2"
          >
            <option disabled>Page size</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>
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
                    {id} - {attributes.title}
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
        pageCount={data.meta.pagination.pageCount}
        onClickPrev={onClickPrev}
        onClickNext={onClickNext}
        isLoading={isLoading || isFetching}
        total={data.meta.pagination.total}
      />
    </div>
  );
};

export default TodosPage;
