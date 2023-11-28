import { ButtonHTMLAttributes, memo } from "react";

type TProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = memo(({ children, ...props }: TProps) => {
  return <button {...props}>{children}</button>;
});
