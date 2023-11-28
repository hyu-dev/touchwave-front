import { EmptyTemplate } from "@components/templates/Empty";
import { useCallData } from "@hooks/useCallData";
import { Navigate, Outlet } from "react-router-dom";

const AppHome = () => {
  const { accountState, teamState } = useCallData();
  const account = accountState.account;

  if (account === undefined) {
    return <EmptyTemplate />;
  }

  if (account === null) {
    return <Navigate to="/login" />;
  }

  return (
    <Outlet
      context={{
        account,
        accountState,
        teamState,
      }}
    />
  );
};

export default AppHome;
