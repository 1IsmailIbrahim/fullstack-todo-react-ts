interface IProps {
  page: number;
  pageCount: number;
  // total: number;
  // isLoading: boolean;
  onClickPrev: () => void;
  onClickNext: () => void;
}

const Paginator = ({ page, pageCount, onClickPrev, onClickNext }: IProps) => {
  return (
    <div className="flex justify-evenly items-center my-5">
      <button
        disabled={page === 1}
        onClick={onClickPrev}
        type="button"
        className="bg-gray-800 text-white rounded-l-md border-r border border-gray-100 flex items-center justify-center px-4 h-10 me-3 text-base font-medium rounded-lg hover:text-blue-500 hover:border-blue-500 disabled:text-gray-600 disabled:border-gray-600  disabled:cursor-not-allowed"
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
      </button>
      <button
        disabled={page === pageCount}
        onClick={onClickNext}
        type="button"
        className="bg-gray-800 text-white rounded-l-md border-r border border-gray-100 flex items-center justify-center px-4 h-10 me-3 text-base font-medium rounded-lg hover:text-blue-500 hover:border-blue-500 disabled:text-gray-600 disabled:border-gray-600  disabled:cursor-not-allowed"
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
      </button>
    </div>
  );
};

export default Paginator;
