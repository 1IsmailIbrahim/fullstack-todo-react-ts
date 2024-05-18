import Button from "./Button";

interface IProps {
  page: number;
  pageCount: number;
  total: number;
  isLoading: boolean;
  onClickPrev: () => void;
  onClickNext: () => void;
}

const Paginator = ({
  page,
  pageCount,
  isLoading,
  onClickPrev,
  onClickNext,
  total,
}: IProps) => {
  return (
    <div className="my-5">
      <div className="my-5 flex justify-evenly items-center">
        <Button
          locked={page === 1 || isLoading}
          onClick={onClickPrev}
          type="button"
          variant={"paginate"}
        >
          <svg
            className="w-3.5 h-3.5 me-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 5H1m0 0 4 4M1 5l4-4"
            />
          </svg>
          Previous
        </Button>
        <Button
          locked={page === pageCount || isLoading}
          onClick={onClickNext}
          type="button"
          variant={"paginate"}
        >
          Next
          <svg
            className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Button>
      </div>
      <div className="text-sm text-white text-center">
        Page
        <span className="mx-1 font-semibold text-blue-500 text-md-1">
          {page}
        </span>
        to
        <span className="mx-1 font-smeibold text-blue-500">{pageCount}</span> of
        <span className="mx-1 font-semibold text-blue-500">{total}</span>
        Records
      </div>
    </div>
  );
};

export default Paginator;
