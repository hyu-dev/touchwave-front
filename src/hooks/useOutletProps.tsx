import { TAccount, TAccountAction } from "@hooks/useAccount";
import { TTeamAction } from "@hooks/useTeam";
import { useOutletContext } from "react-router";

type TOutletContextProps = {
  account: TAccount;
  accountState: TAccountAction;
  teamState: TTeamAction;
};

export const useOutletProps = () => {
  return useOutletContext<TOutletContextProps>();
};
