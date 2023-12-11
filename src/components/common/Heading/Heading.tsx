import { cls } from "@utils/classname";
import { HTMLAttributes } from "react";

type THeading = "h1" | "h2" | "h3";

type TProps = {
  as: THeading;
} & HTMLAttributes<HTMLHeadingElement>;

export const Heading = ({ as = "h1", children, className, ...props }: TProps) => {
  const HeadingTag = as;

  return (
    <HeadingTag className={cls("select-none", "font-point", className)} {...props}>
      {children}
    </HeadingTag>
  );
};
