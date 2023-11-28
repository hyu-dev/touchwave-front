import { UserTemplate } from "@components/templates/User";
import { useOutletProps } from "@hooks/useOutletProps";
import { Navigate } from "react-router-dom";

const AppUser = () => {
  const { account } = useOutletProps();

  if (account.role === "ADMIN") {
    return <Navigate to="/admin" />;
  }

  return <UserTemplate />;
};

export default AppUser;
