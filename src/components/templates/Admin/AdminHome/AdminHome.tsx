import { useOutletProps } from "@hooks/useOutletProps";
import { Navigate } from "react-router";

export const AdminHomeTemplate = () => {
  const { teamState } = useOutletProps();
  const team = teamState.team;

  if (team === undefined) {
    return <></>;
  }

  if (team === null) {
    return <Navigate to="/admin/no-team" />;
  }

  return <Navigate to="/admin/team" />;
};
