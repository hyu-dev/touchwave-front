import { useOutletProps } from "@hooks/useOutletProps";
import { Navigate } from "react-router";

export const HomeTemplate = () => {
  const { account } = useOutletProps();
  const role = account.role;

  if (!account.verify) {
    return <Navigate to="/not-access" />;
  }

  if (role === "USER") {
    return <Navigate to="/user" />;
  }

  if (role === "ADMIN") {
    return <Navigate to="/admin" />;
  }
};
