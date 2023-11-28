import { SyncLoader } from "react-spinners";
import { LoaderSizeMarginProps } from "react-spinners/helpers/props";

export const Loading = ({ size = 20, color = "#94A684", ...props }: LoaderSizeMarginProps) => {
  return (
    <div>
      <SyncLoader {...props} size={size} color={color} />
    </div>
  );
};
