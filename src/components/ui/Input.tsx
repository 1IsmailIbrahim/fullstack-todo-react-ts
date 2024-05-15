import { InputHTMLAttributes, Ref, forwardRef } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef(({ ...rest }: IProps, ref: Ref<HTMLInputElement>) => {
  return (
    <input
      ref={ref}
      {...rest}
      className="bg-transparent w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:shadow-outline
        placeholder-gray-400 text-gray-700 transition duration-300 ease-in-out hover:border-gray-500 
        focus:border-gray-800 shadow-md"
    />
  );
});

export default Input;
