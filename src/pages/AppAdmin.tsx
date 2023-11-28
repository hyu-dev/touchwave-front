import { AdminTemplate } from "@components/templates/Admin";
import { useOutletProps } from "@hooks/useOutletProps";
import { Navigate } from "react-router-dom";

const AppAdmin = () => {
  const { account } = useOutletProps();

  if (account.role === "USER") {
    return <Navigate to="/user" />;
  }

  return <AdminTemplate />;
};

export default AppAdmin;
