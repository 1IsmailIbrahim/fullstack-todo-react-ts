import * as yup from "yup";

export const registerSchema = yup
  .object({
    username: yup
      .string()
      .required("Username is required!")
      .min(5, "Username should be at least 5 characters."),
    email: yup
      .string()
      .required("Email is required!")
      .matches(
        /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
        "Invalid Email, must be like 'email@email.com'"
      ),
    password: yup
      .string()
      .required("Password is required!")
      .min(6, "Password should be at least 6 characters."),
  })
  .required();

export const LoginSchema = yup
  .object({
    identifier: yup
      .string()
      .required("Email is required!")
      .matches(
        /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
        "Invalid Email, must be like 'email@email.com'"
      ),
    password: yup
      .string()
      .required("Password is required!")
      .min(6, "Password should be at least 6 characters."),
  })
  .required();

export const UpdateSchema = yup
  .object({
    title: yup.string().required("Title is required!"),
    description: yup.string().required("Description is required!"),
  })
  .required();
