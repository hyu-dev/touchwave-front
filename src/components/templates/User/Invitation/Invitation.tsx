import { Button } from "@components/common/Button";
import { Input } from "@components/common/Input";
import { Label } from "@components/common/Label";
import { Spacing } from "@components/common/Spacing";
import { DeleteAccount } from "@components/templates/DeleteAccount";
import { FirestoreError, addDoc, collection } from "@firebase/firestore";
import { useLoadingState } from "@hooks/useLoading";
import { useOutletProps } from "@hooks/useOutletProps";
import { Alert } from "@utils/Alert";
import { fb } from "@utils/firebase";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

type TFormValue = {
  invitation: string;
};

export const UserInviteTemplate = () => {
  const navigate = useNavigate();

  const outletProps = useOutletProps();
  const { account, teamState } = outletProps;
  const { onChangeLoading } = useLoadingState();

  const { handleSubmit, register } = useForm<TFormValue>();

  const inputProps = useMemo(
    () => ({
      placeholder: "Please enter invitation code.",
      register: register("invitation", {
        required: true,
      }),
    }),
    []
  );

  const onSubmit = useCallback(
    async ({ invitation }: TFormValue) => {
      try {
        onChangeLoading(true);

        // 초대코드로 팀 정보 불러오기
        const team = await fb.api.getTeamFromInviteCode(invitation);

        // 팀이 없는 경우
        if (team === null) {
          Alert.warning({ text: "Team does not exist." });
          throw new Error("");
        }

        // 팀이 있으면 연결 등록
        await addDoc(collection(fb.db, "links"), {
          userDocId: account.id,
          teamDocId: team.id,
        });

        // 팀 state 저장
        teamState.onChangeTeam(team);

        // 홈으로 이동
        navigate("/");
      } catch (e) {
        if (e instanceof FirestoreError) {
          Alert.error({ text: fb.errors(e.code) });
        }
      } finally {
        onChangeLoading(false);
      }
    },
    [teamState, onChangeLoading]
  );

  return (
    <form className="w-full flex-1 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full flex-1 flex flex-col justify-center">
        <Label className="font-point" htmlFor="mobileInput">
          invitation
        </Label>
        <Spacing className="h-[15px]" />
        {Input<"invitation">(inputProps)}
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        <Button type="submit" className="btn-md-style">
          ENTER
        </Button>
        <DeleteAccount />
      </div>
    </form>
  );
};
