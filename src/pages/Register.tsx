import Button from "../components/ui/Button";
import ErrorMsg from "../components/ui/ErrorMsg";
import Input from "../components/ui/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import { regForm } from "../data";
import { IErrorResponse, IFormInput } from "../interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../validation";
import axiosInstance from "../config/axios.config";
import toast from "react-hot-toast";
import { useState } from "react";
import { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(registerSchema) });

  // ** Handlers
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/local/register", data);
      if (res.status == 200) {
        toast.success("Registration successful! Proceed to login", {
          className: "bg-gray-800 text-blue-400 mb-7 font-semibold",
          duration: 1800,
          position: "bottom-center",
        });
      }
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.log(error);
      const errObj = error as AxiosError<IErrorResponse>;
      const errMsg = errObj.response?.data?.error.message;
      toast.error(`${errMsg}`, {
        className: "bg-gray-800 text-blue-400 mb-7 font-semibold",
        duration: 1800,
        position: "bottom-center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ** Renders
  const renderRegisterForm = regForm.map(
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
        Register to get access!
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {renderRegisterForm}
        <Button fullWidth isLoading={isLoading}>
          Register
        </Button>
        <div className="text-center flex justify-center space-x-2">
          <span className="text-gray-600">have an account?</span>
          <Link to={"/login"} className="underline text-blue-500">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
