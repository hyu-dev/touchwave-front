import { IconBaseProps } from "@react-icons/all-files";
import { FaList } from "@react-icons/all-files/fa/FaList";

const Icons = {
  list: FaList,
};

type TProps = {
  iconKey: keyof typeof Icons;
} & IconBaseProps;

export const ReactIcon = ({ iconKey, ...props }: TProps) => {
  const IconComponent = Icons[iconKey];

  return <IconComponent {...props} />;
};
