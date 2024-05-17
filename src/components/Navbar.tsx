import { ListTodo } from "lucide-react";
import toast from "react-hot-toast";
import { Link, NavLink, useLocation } from "react-router-dom";
import Button from "./ui/Button";

const Navbar = () => {
  const { pathname } = useLocation();
  const storageKey = "userData";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null;

  // ** Handler
  const onLogout = () => {
    localStorage.removeItem(storageKey);
    toast(
      <p>
        You have successfully
        <span className="ml-1 text-red-600 font-bold">logged out!</span>
      </p>,
      {
        className: "bg-gray-800 text-blue-500 mb-7 font-semibold text-lg",
        duration: 1800,
        position: "bottom-center",
        icon: "⚠️",
      }
    );
    setTimeout(() => {
      location.replace(pathname);
    }, 1800);
  };
  return (
    <nav className="max-w-4xl md:mt-3 mx-auto md:rounded-md bg-gray-800 text-white p-4 mb-7 mt-0 rounded-none">
      <div className="md:container mx-auto flex justify-between items-center">
        <div className="flex justify-center items-center space-x-1">
          <ListTodo className="text-blue-500" />
          <Link to="/" className="text-xl font-semibold">
            TODO
          </Link>
        </div>
        <div className="flex justify-center items-center ">
          <NavLink to="/" className="mx-2 hover:text-blue-500 font-semibold">
            Home
          </NavLink>
          {userData ? (
            <div className="flex justify-center items-center">
              <NavLink
                to="/todos"
                className="mx-2 hover:text-blue-500 font-semibold"
              >
                Todos
              </NavLink>
              <NavLink
                to="/profile"
                className="mx-2 hover:text-blue-500 font-semibold"
              >
                Profile
              </NavLink>
              <Button
                size={"sm"}
                variant={"danger"}
                onClick={onLogout}
                className="ml-2"
              >
                Logout
              </Button>
            </div>
          ) : (
            <div>
              <NavLink
                to="/register"
                className="mx-2 hover:text-blue-500 font-semibold"
              >
                Register
              </NavLink>
              <NavLink
                to="/login"
                className="mx-2 hover:text-blue-500 font-semibold"
              >
                Login
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
