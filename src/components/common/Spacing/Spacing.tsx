import { HTMLAttributes } from "react";

type TProps = HTMLAttributes<HTMLDivElement>;

export const Spacing = ({ ...props }: TProps) => {
  return <div {...props} />;
};
