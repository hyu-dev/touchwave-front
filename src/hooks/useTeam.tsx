import { useCallback, useMemo, useState } from "react";

export type TTeam = {
  id: string;
  invitationCode: string;
  teamName: string;
  buttonName: string;
  peopleCount: number;
};

export type TChangeTeamEntries = Partial<Pick<TTeam, "buttonName" | "peopleCount" | "teamName">>;

export type TTeamAction = {
  team: TTeam | null | undefined;
  onChangeTeam: (team: TTeam | null) => void;
  onChangeTeamInfo: (changeEntries: TChangeTeamEntries) => void;
};

export const useTeamAction = (): TTeamAction => {
  const [team, setTeam] = useState<TTeam | null>();

  const onChangeTeam = useCallback(
    (team: TTeam | null) => {
      setTeam(team);
    },
    [setTeam]
  );

  const onChangeTeamInfo = useCallback(
    (changeEntries: TChangeTeamEntries) => {
      setTeam((prev) => (prev ? { ...prev, ...changeEntries } : null));
    },
    [setTeam]
  );

  const resultProps = useMemo(
    () => ({
      team,
      onChangeTeam,
      onChangeTeamInfo,
    }),
    [team]
  );

  return resultProps;
};
