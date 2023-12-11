import { ArticleBox } from "@components/common/Box";
import { Button } from "@components/common/Button";
import { Spacing } from "@components/common/Spacing";
import { Text } from "@components/common/Text";
import {
  FirestoreError,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "@firebase/firestore";
import { useLoadingState } from "@hooks/useLoading";
import { useOutletProps } from "@hooks/useOutletProps";
import { Alert } from "@utils/Alert";
import { fb } from "@utils/firebase";
import { Fragment, useCallback } from "react";
import { Navigate, useNavigate } from "react-router";

export const TeamTemplate = () => {
  const navigate = useNavigate();

  const loadingState = useLoadingState();
  const { teamState } = useOutletProps();

  const onEdit = useCallback(() => {
    Alert.confirm({
      html: "Are you going to edit your team?",
      action: (result) => {
        if (result.isConfirmed) {
          navigate("/admin/setting");
        }
      },
    });
  }, [navigate]);

  const onDeleteTeam = useCallback(() => {
    Alert.confirm({
      html: "Are you sure you want to delete your team?",
      action: async (result) => {
        if (result.isConfirmed && !!teamState.team) {
          // 팀 삭제 로직
          try {
            loadingState.onChangeLoading(true);

            // 팀 연결링크 찾기
            const teamLinkQuery = query(
              collection(fb.db, "links"),
              where("teamDocId", "==", teamState.team.id)
            );
            const snapshot = await getDocs(teamLinkQuery);

            // 없으면 오류
            if (!snapshot.size) {
              throw new Error("");
            }

            const deleteDocs = snapshot.docs.map((docData) =>
              deleteDoc(doc(fb.db, "links", docData.id))
            );

            await Promise.all(deleteDocs);

            // 팀 삭제
            const docRef = doc(fb.db, "teams", teamState.team.id);
            await deleteDoc(docRef);

            Alert.success({ text: "Team deletion has been completed." });
            teamState.onChangeTeam(null);

            // 홈으로 이동
            navigate("/");
          } catch (e) {
            if (e instanceof FirestoreError) {
              Alert.error({ text: fb.errors(e.code) });
            } else {
              Alert.error({ text: fb.errors("") });
            }
          } finally {
            loadingState.onChangeLoading(false);
          }
        }
      },
    });
  }, [loadingState, teamState.team]);

  const onClickInviteCode = useCallback(
    (contentId?: string) => () => {
      if (contentId) {
        const doc = document.getElementById(contentId) as HTMLParagraphElement;
        try {
          if (doc && doc.textContent) {
            navigator.clipboard.writeText(doc.textContent);
            Alert.success({ text: "Copied to clipboard." });
          }
        } catch (e) {
          doc.style.userSelect = "text";
          Alert.error({ text: "Clipboard is not supported" });
        }
      }
    },
    []
  );

  return (
    <div className="w-full flex-1 flex flex-col">
      <Spacing className="h-[20px]" />
      <div className="w-full flex-1 flex flex-col justify-center items-center">
        <Text as="p" className="text-lg text-cs-primary font-point">
          Information of the created team
        </Text>
        <Spacing className="h-[15px]" />
        <div className="w-full flex-1 flex flex-col items-center">
          {teamState.team ? (
            <Fragment>
              <ArticleBox title="Team Name" content={teamState.team.teamName} />
              <Spacing className="h-[10px]" />
              <ArticleBox title="Button Name" content={teamState.team.buttonName} />
              <Spacing className="h-[10px]" />
              <ArticleBox title="Number of People" content={`${teamState.team.peopleCount}`} />
              <Spacing className="h-[10px]" />
              <ArticleBox
                title="Invitation Code"
                content={teamState.team.invitationCode}
                contentId="invitationCodeText"
                onClick={onClickInviteCode}
                cursor="cursor-pointer"
              />
            </Fragment>
          ) : (
            <Navigate to="/" />
          )}
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        <Button type="button" className="btn-md-style" onClick={onEdit}>
          EDIT
        </Button>
        <Button type="button" className="btn-text-style" onClick={onDeleteTeam}>
          DELETE TEAM
        </Button>
      </div>
    </div>
  );
};
