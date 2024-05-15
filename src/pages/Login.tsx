import { useState } from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { loginForm } from "../data";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import ErrorMsg from "../components/ui/ErrorMsg";
import { LoginSchema } from "../validation";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { IErrorResponse } from "../interfaces";
import axiosInstance from "../config/axios.config";

export interface IFormInput {
  identifier: string;
  password: string;
}
const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(LoginSchema) });

  // ** Handlers
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true);
    try {
      const { status, data: resData } = await axiosInstance.post(
        "/auth/local",
        data
      );
      console.log(resData);
      if (status == 200) {
        toast.success("Successfully Loggedin!", {
          className: "bg-gray-800 text-blue-500 mb-7 font-semibold",
          duration: 1800,
          position: "bottom-center",
        });
        localStorage.setItem("userData", JSON.stringify(resData));
      }
      setTimeout(() => {
        location.replace("/");
      }, 1000);
    } catch (error) {
      console.log(error);
      const errObj = error as AxiosError<IErrorResponse>;
      const errMsg = errObj.response?.data?.error.message;
      toast.error(`${errMsg}`, {
        className: "bg-gray-800 text-blue-500 mb-7 font-semibold",
        duration: 2000,
        position: "bottom-center",
      });
    } finally {
      setIsLoading(false);
    }
  };
  // ** Renders
  const renderLoginForm = loginForm.map(
    ({ placeholder, type, name, validation }, idx) => (
      <div key={idx}>
        <Input
          type={type}
          placeholder={placeholder}
          {...register(name, validation)}
        />
        {errors[name] && <ErrorMsg msg={errors[name]?.message} />}
      </div>
    )
  );
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-7 text-2xl md:text-3xl font-semibold">
        Login to get access!
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {renderLoginForm}
        <Button fullWidth isLoading={isLoading}>
          Login
        </Button>
      </form>
    </div>
  );
};
export default LoginPage;
