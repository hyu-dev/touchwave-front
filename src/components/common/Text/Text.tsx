import { cls } from "@utils/classname";
import { HTMLAttributes } from "react";

type TParagraph = "p" | "i" | "em" | "strong";

type TProps = {
  as: TParagraph;
} & HTMLAttributes<HTMLParagraphElement>;

export const Text = ({ as, children, className, ...props }: TProps) => {
  const TextTag = as;

  const getNames = (as: TParagraph) => {
    switch (as) {
      case "p":
      case "i":
        return "font-mono font-thin";
    }
  };

  return (
    <TextTag className={cls("select-none", className, getNames(as))} {...props}>
      {children}
    </TextTag>
  );
};
