import { Link, useLocation } from "react-router-dom";

interface IProps {
  statusCode?: number;
  title?: string;
}

const ErrorHandler = ({ statusCode = 500, title = "Server Error" }: IProps) => {
  const { pathname } = useLocation();
  return (
    <div className="fixed inset-0 min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-lg w-full bg-gray-700 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-100 mb-4">
          {statusCode} - {title}
        </h2>
        <p className="text-gray-100 mb-6">
          We're sorry, but it seems that there was an error processing your
          request.
        </p>
        <p className="text-gray-100 mb-6">
          Please try again later or contact support for further assistance.
        </p>
        <div className="flex space-x-6 justify-center">
          <Link
            to={pathname}
            className="bg-gray-800 hover:bg-slate-950 hover:text-white inline-block text-white py-2 px-4 rounded"
            reloadDocument
          >
            Refresh
          </Link>
          <Link
            to={"/"}
            className="bg-gray-800 hover:bg-slate-950 hover:text-white inline-block text-white py-2 px-4 rounded"
          >
            Go Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorHandler;
