import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="fixed inset-0 min-h-screen flex flex-col justify-center items-center">
      <h2 className="text-9xl font-semibold mb-4 text-center">404</h2>
      <p className="space-x-1 text-2xl font-bold text-center md:text-3xl">
        <span className="text-red-500">Oops!</span>
        <span>Page Not Found </span>
      </p>
      <p className="text-center my-5 text-xl">
        The page you're looking for doesn't exist.
      </p>
      <div className="flex justify-center">
        <Link
          to={"/"}
          className="bg-gray-800 hover:bg-gray-900 hover:text-white inline-block text-white py-2 px-4 rounded"
        >
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
