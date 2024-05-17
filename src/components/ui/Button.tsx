import { cn } from "../../lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { HTMLAttributes, ReactNode } from "react";
import AnimateSpain from "./AnimateSpin";

const buttonVariants = cva(
  "rounded-md font-medium text-white duration-300 dark:text-black flex items-center justify-center disabled:hover:bg-gray-400 disabled:bg-gray-400 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        // ** FILLED
        default:
          "bg-slate-900 dark:bg-gray-900 dark:text-white dark:hover:bg-slate-950",
        danger:
          "bg-red-900 dark:bg-red-600 dark:text-white dark:hover:bg-red-700",
        cancel:
          "bg-gray-300 text-gray-700 dark:bg-gray-500 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-400",

        // ** OUTLINE
        outline:
          "border border-bg-white hover:border-blue-500 dark:text-white dark:hover:text-blue-500",
      },
      size: {
        default: "p-3",
        sm: "text-sm px-4 py-2",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
  isLoading?: boolean;
  type?: "submit" | "reset" | "button";
}

const Button = ({
  type,
  variant,
  size,
  fullWidth,
  className,
  children,
  isLoading,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size, fullWidth, className }))}
      {...props}
      disabled={isLoading}
    >
      {isLoading ? <AnimateSpain /> : null}
      {children}
    </button>
  );
};

export default Button;
