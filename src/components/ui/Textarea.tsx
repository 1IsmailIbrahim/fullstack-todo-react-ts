import { TextareaHTMLAttributes } from "react";

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = ({ ...rest }: IProps) => {
  return (
    <textarea
      className="bg-transparent w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:shadow-outline
      placeholder-gray-400 text-gray-700 transition duration-300 ease-in-out hover:border-gray-500 
      focus:border-gray-800 shadow-md max-h-svh resize-none hover:md:resize-y"
      rows={6}
      {...rest}
    />
  );
};

export default Textarea;
