import { useCallback, useMemo, useState } from "react";

export type TTeam = {
  id: string;
  invitationCode: string;
  teamName: string;
  buttonName: string;
  peopleCount: number;
};

export type TTeamAction = {
  team: TTeam | null | undefined;
  onChangeTeam: (team: TTeam | null) => void;
  onChangePeople: (people: number) => void;
};

export const useTeamAction = (): TTeamAction => {
  const [team, setTeam] = useState<TTeam | null>();

  const onChangeTeam = useCallback(
    (team: TTeam | null) => {
      setTeam(team);
    },
    [setTeam]
  );

  const onChangePeople = useCallback(
    (people: number) => {
      setTeam((prev) => (prev ? { ...prev, peopleCount: people } : null));
    },
    [setTeam]
  );

  const resultProps = useMemo(
    () => ({
      team,
      onChangeTeam,
      onChangePeople,
    }),
    [team]
  );

  return resultProps;
};
