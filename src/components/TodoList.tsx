import Button from "./ui/Button";
import useCustomQuery from "../hooks/useCustomQuery";
import { ITodo } from "../interfaces";
import Model from "./ui/Modal";
import Input from "./ui/Input";
import { ChangeEvent, FormEvent, useState } from "react";
import Textarea from "./ui/Textarea";
import axiosInstance from "../config/axios.config";
import TodoSekelton from "./ui/TodoSekelton";
import { faker } from "@faker-js/faker";

const TodoList = () => {
  const storageKey = "userData";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null;

  const [queryVersion, setQueryVersion] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isUpdtaing, setIsUpdating] = useState(false);
  const [todoToEdit, setTodoToEdit] = useState<ITodo>({
    id: 0,
    title: "",
    description: "",
  });

  const [todoToAdd, setTodoToAdd] = useState({
    title: "",
    description: "",
  });

  const { isLoading, data } = useCustomQuery({
    url: "/users/me?populate=todos",
    queryKey: ["TodoList", `${queryVersion}`],
    config: {
      headers: {
        Authorization: `Bearer ${userData.jwt}`,
      },
    },
  });

  // ** Handler
  const onCloseEditModel = () => {
    setTodoToEdit({
      id: 0,
      title: "",
      description: "",
    });
    setIsEditModalOpen(false);
  };
  const onOpenEditModel = (todo: ITodo) => {
    setTodoToEdit(todo);
    setIsEditModalOpen(true);
  };

  const onOpenAddModel = () => {
    setIsOpenAddModal(true);
  };
  const onCloseAddModel = () => {
    setTodoToAdd({
      title: "",
      description: "",
    });
    setIsOpenAddModal(false);
  };

  const onOpenDeleteModel = (todo: ITodo) => {
    setTodoToEdit(todo);
    setIsDeleteModalOpen(true);
  };
  const onCloseDeleteModel = () => {
    setTodoToEdit({
      id: 0,
      title: "",
      description: "",
    });
    setIsDeleteModalOpen(false);
  };

  const onChangeHandler = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { value, name } = e.target;
    setTodoToEdit({ ...todoToEdit, [name]: value });
  };

  const onChangeAddHandler = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { value, name } = e.target;
    setTodoToAdd({ ...todoToAdd, [name]: value });
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    setIsUpdating(true);
    e.preventDefault();
    const { title, description } = todoToEdit;
    try {
      const { status } = await axiosInstance.put(
        `/todos/${todoToEdit.id}`,
        {
          data: { title, description },
        },
        {
          headers: {
            Authorization: `Bearer ${userData.jwt}`,
          },
        }
      );
      if (status == 200) {
        setQueryVersion((prev) => prev + 1);
        onCloseEditModel();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdating(false);
    }
  };

  const onSubmitAddTodoHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdating(true);
    const { title, description } = todoToAdd;
    try {
      const todaData = {
        data: { title, description, user: [userData?.user.id] },
      };
      const { status } = await axiosInstance.post(`/todos`, todaData, {
        headers: {
          Authorization: `Bearer ${userData.jwt}`,
        },
      });
      if (status == 200) {
        setQueryVersion((prev) => prev + 1);
        onCloseAddModel();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdating(false);
    }
  };

  const removeHandler = async (e: FormEvent<HTMLFormElement>) => {
    setIsUpdating(true);
    e.preventDefault();
    try {
      const { status } = await axiosInstance.delete(`/todos/${todoToEdit.id}`, {
        headers: {
          Authorization: `Bearer ${userData.jwt}`,
        },
      });
      if (status == 200) {
        setQueryVersion((prev) => prev + 1);
        onCloseDeleteModel();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdating(false);
    }
  };

  const onGenerateTodos = async () => {
    for (let i = 0; i < 100; i++) {
      try {
        const todaData = {
          data: {
            title: faker.word.words(3),
            description: faker.lorem.paragraph(2),
            user: [userData?.user.id],
          },
        };
        await axiosInstance.post(`/todos`, todaData, {
          headers: {
            Authorization: `Bearer ${userData.jwt}`,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (isLoading)
    return (
      <div className="bg-slate-200 rounded-md">
        {Array.from({ length: 3 }, (_, idx) => (
          <TodoSekelton key={idx} />
        ))}
      </div>
    );

  let i = 1;
  return (
    <div className="space-y-1 max-w-5xl mx-auto rounded-md bg-gray-800 text-white p-4 mb-7 mt-0">
      <Button
        className="mx-auto mb-2"
        variant={"outline"}
        onClick={onGenerateTodos}
      >
        Generate todos
      </Button>
      <div className="space-y-1">
        <div className="fixed bottom-16 right-9">
          <button
            onClick={() => {
              onOpenAddModel();
            }}
            className="flex justify-center items-center w-14 h-14 text-4xl leading-9 cursor-pointer bg-slate-900 dark:bg-gray-900 dark:text-white dark:hover:bg-slate-950 rounded-full opacity-50 hover:opacity-100 duration-300"
          >
            +
          </button>
        </div>
      </div>
      {data.todos.length ? (
        data.todos.map((todo: ITodo) => (
          <div
            key={todo.id}
            className="flex items-center justify-between hover:bg-gray-600 duration-300 p-3 rounded-md even:text-blue-500 even:bg-gray-600"
          >
            <div>
              <p className="w-full font-semibold">
                {i++} - {todo.title}
              </p>
              <span className="block w-full py-1 text-sm text-slate-300">
                {todo.description}
              </span>
            </div>
            <div className="flex items-center justify-end w-full space-x-3">
              <Button
                size={"sm"}
                onClick={() => {
                  onOpenEditModel(todo);
                }}
              >
                Edit
              </Button>
              <Button
                variant={"danger"}
                size={"sm"}
                onClick={() => {
                  onOpenDeleteModel(todo);
                }}
              >
                Remove
              </Button>
            </div>
          </div>
        ))
      ) : (
        <h3 className="w-full font-semibold p-3 rounded-md even:bg-gray-600">
          No todos yet
        </h3>
      )}

      {/* Edit Todos  */}
      <Model
        isOpen={isEditModalOpen}
        closeModal={onCloseEditModel}
        title="Edit this todo"
      >
        <form className="space-y-3" onSubmit={submitHandler}>
          <div className="space-y-2">
            <span className="text-gray-600">Edit title</span>
            <Input
              name="title"
              value={todoToEdit.title}
              onChange={onChangeHandler}
            />
          </div>
          <div className="space-y-2">
            <span className="text-gray-600">Edit description</span>
            <Textarea
              name="description"
              value={todoToEdit.description}
              onChange={onChangeHandler}
            />
          </div>
          <div className="flex justify-end space-x-2 mt-3">
            <Button size={"sm"} isLoading={isUpdtaing}>
              Update
            </Button>
            <Button
              type="button"
              onClick={onCloseEditModel}
              size={"sm"}
              variant={"cancel"}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Model>

      {/* Remove Todos  */}
      <Model
        isOpen={isDeleteModalOpen}
        closeModal={onCloseDeleteModel}
        title="Delete Todo"
        description="If you delete this todo, you will lose all data about it, and you will not be able to return it again."
      >
        <form className="flex justify-end space-x-3" onSubmit={removeHandler}>
          <Button size={"sm"} variant={"danger"} isLoading={isUpdtaing}>
            Delete
          </Button>
          <Button
            type="button"
            size={"sm"}
            variant={"cancel"}
            onClick={onCloseDeleteModel}
          >
            Close
          </Button>
        </form>
      </Model>

      {/* ADD Todos  */}
      <Model
        isOpen={isOpenAddModal}
        closeModal={onCloseAddModel}
        title="Add a new todo"
      >
        <form className="space-y-3" onSubmit={onSubmitAddTodoHandler}>
          <div className="space-y-2">
            <span className="text-gray-600">Add title</span>
            <Input
              name="title"
              value={todoToAdd.title}
              onChange={onChangeAddHandler}
            />
          </div>
          <div className="space-y-2">
            <span className="text-gray-600">Add description</span>
            <Textarea
              name="description"
              value={todoToAdd.description}
              onChange={onChangeAddHandler}
            />
          </div>
          <div className="flex justify-end space-x-2 mt-3">
            <Button size={"sm"} isLoading={isUpdtaing}>
              Add
            </Button>
            <Button
              type="button"
              onClick={onCloseAddModel}
              size={"sm"}
              variant={"cancel"}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Model>
    </div>
  );
};

export default TodoList;
