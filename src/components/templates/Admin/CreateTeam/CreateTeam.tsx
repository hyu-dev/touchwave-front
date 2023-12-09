import { Button } from "@components/common/Button";
import { Input } from "@components/common/Input";
import { Label } from "@components/common/Label";
import { Spacing } from "@components/common/Spacing";
import { Text } from "@components/common/Text";
import { FirestoreError, addDoc, collection, doc, updateDoc } from "@firebase/firestore";
import { useLoadingState } from "@hooks/useLoading";
import { useOutletProps } from "@hooks/useOutletProps";
import { Alert } from "@utils/Alert";
import { fb } from "@utils/firebase";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { SweetAlertResult } from "sweetalert2";
import { v4 } from "uuid";

type TFormValue = {
  teamName: string;
  buttonName: string;
  people: number;
};

export const SettingTeamTemplate = () => {
  const loadingState = useLoadingState();
  const outletProps = useOutletProps();
  const { account, teamState } = outletProps;

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormValue>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      teamName: teamState.team?.teamName,
      buttonName: teamState.team?.buttonName,
      people: teamState.team?.peopleCount,
    },
  });

  const inputProps = useMemo(
    () => ({
      teamName: {
        id: "teamNameInput",
        placeholder: "Please enter your team name.",
        disabled: !!teamState.team?.teamName,
        register: register("teamName", {
          required: true,
          pattern: /^[a-zA-Z가-힣]{1,10}$/g,
        }),
      },
      buttonName: {
        id: "buttonNameInput",
        placeholder: "Please enter the button name.",
        disabled: !!teamState.team?.buttonName,
        register: register("buttonName", {
          required: true,
          pattern: /^[a-zA-Z가-힣]{1,10}$/g,
        }),
      },
      people: {
        id: "peopleInput",
        type: "number",
        min: 10,
        max: 100,
        defaultValue: 10,
        register: register("people", {
          valueAsNumber: true,
          required: true,
          min: 10,
          max: 100,
        }),
      },
    }),
    [register, teamState.team]
  );

  // 팀 등록 로직
  const createTeam = useCallback(
    ({ buttonName, people, teamName }: TFormValue) =>
      async (result: SweetAlertResult) => {
        if (result.isConfirmed) {
          loadingState.onChangeLoading(true);
          // 팀 초대코드
          const uuid = v4();

          try {
            // 서버 저장 (팀정보)
            const sendData = {
              invitationCode: uuid,
              teamName,
              buttonName,
              peopleCount: people,
            };

            const team = await addDoc(collection(fb.db, "teams"), sendData);

            // 서버 저장 (팀, 유저 연결 테이블)
            await addDoc(collection(fb.db, "links"), {
              userDocId: account.id,
              teamDocId: team.id,
            });

            // 팀 state 저장
            teamState.onChangeTeam({ id: team.id, ...sendData });

            // 홈으로 이동
            navigate("/admin");
          } catch (e) {
            if (e instanceof FirestoreError) {
              Alert.error({ text: fb.errors(e.code) });
            }
          } finally {
            loadingState.onChangeLoading(false);
          }
        }
      },
    [teamState, loadingState]
  );

  // 팀 수정 로직
  const editTeam = useCallback(
    ({ people, teamDocId }: TFormValue & { teamDocId: string }) =>
      async (result: SweetAlertResult) => {
        if (result.isConfirmed) {
          loadingState.onChangeLoading(true);
          try {
            // 팀 찾기
            const docRef = doc(fb.db, "teams", teamDocId);
            // 팀 업데이트
            await updateDoc(docRef, { peopleCount: people });

            // 팀 state 변경
            teamState.onChangePeople(people);

            // 홈으로 이동
            navigate("/admin");
          } catch (e) {
            if (e instanceof FirestoreError) {
              Alert.error({ text: fb.errors(e.code) });
            }
          } finally {
            loadingState.onChangeLoading(false);
          }
        }
      },
    [teamState, loadingState]
  );

  const onSubmit = (props: TFormValue) => {
    const actionText = !!teamState.team ? "edit" : "register";
    const action = !!teamState.team
      ? editTeam({ ...props, teamDocId: teamState.team.id })
      : createTeam(props);

    Alert.confirm({
      html: `Are you going to ${actionText} a team?`,
      action,
    });
  };

  const goBack = () => {
    Alert.confirm({
      html: "Are you going to cancel your team registration?",
      action: (result) => {
        if (result.isConfirmed) {
          navigate("/admin");
        }
      },
    });
  };

  return (
    <form className="w-full flex-1 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full flex-1 flex flex-col justify-center">
        <Label className="font-mono text-cs-text" htmlFor="teamNameInput">
          Team Name
        </Label>
        <Spacing className="h-[15px]" />
        {Input<"teamName">(inputProps.teamName)}
        <Text as="p" className="text-error-style h-[35px] px-[10px]">
          {errors.teamName?.type === "pattern" &&
            "✘ Hangul, alphabet upper and lower case letters within 10 characters."}
        </Text>
        <Label className="font-mono text-cs-text" htmlFor="buttonNameInput">
          Button Name
        </Label>
        <Spacing className="h-[15px]" />
        {Input<"buttonName">(inputProps.buttonName)}
        <Text as="p" className="text-error-style h-[35px] px-[10px]">
          {errors.buttonName?.type === "pattern" &&
            "✘ Hangul, alphabet upper and lower case letters within 10 characters."}
        </Text>
        <Label className="font-mono w-[135px] text-cs-text" htmlFor="mobileInput">
          Number Of People
        </Label>
        <Spacing className="h-[15px]" />
        {Input<"people">(inputProps.people)}
        <Text as="p" className="text-error-style h-[35px] px-[10px]">
          {(errors.people?.type === "min" || errors.people?.type === "max") &&
            "✘ Maximum 100 people, Minimum 10 people."}
        </Text>
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        <Button type="submit" className="btn-md-style">
          {!!teamState.team ? "EDIT" : "CREATE"}
        </Button>
        <Button type="button" className="btn-text-style" onClick={goBack}>
          CANCEL
        </Button>
      </div>
    </form>
  );
};
