import { cls } from "@utils/classname";
import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type TProps<T extends string> = InputHTMLAttributes<HTMLInputElement> & {
  register?: UseFormRegisterReturn<T>;
};

export const Input = <T extends string>({ className, register, ...props }: TProps<T>) => {
  return <input className={cls(className)} {...props} {...register} />;
};
