import { cls } from "@utils/classname";
import { LabelHTMLAttributes } from "react";

type TProps = LabelHTMLAttributes<HTMLLabelElement>;

export const Label = ({ children, className, ...props }: TProps) => {
  return (
    <label
      className={cls(
        "inline-block w-[100px] h-[30px] rounded-[15px] leading-[30px] bg-cs-label text-md text-center",
        className
      )}
      {...props}
    >
      {children}
    </label>
  );
};
