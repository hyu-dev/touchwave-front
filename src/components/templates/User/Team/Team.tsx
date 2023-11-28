import { Button } from "@components/common/Button";
import { ReactIcon } from "@components/common/Icons";
import { ModalContainer } from "@components/common/Modal";
import { Spacing } from "@components/common/Spacing";
import { Text } from "@components/common/Text";
import { ClickedUsersModal } from "@components/templates/ClickedUsers";
import {
  FirestoreError,
  Unsubscribe,
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "@firebase/firestore";
import { useLoadingState } from "@hooks/useLoading";
import { useOutletProps } from "@hooks/useOutletProps";
import { Alert } from "@utils/Alert";
import { cls } from "@utils/classname";
import { fb } from "@utils/firebase";
import dayjs from "dayjs";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router";

export const UserTeamTemplate = () => {
  const navigate = useNavigate();

  const loadingState = useLoadingState();
  const { account, teamState, accountState } = useOutletProps();
  const team = teamState.team;

  const [isOpenModal, setOpenModal] = useState(false);

  const onOpenModal = useCallback(() => {
    setOpenModal(true);
  }, [setOpenModal]);

  const onClick = useCallback(async () => {
    if (!team) {
      return Alert.error({ text: fb.errors("") });
    }

    loadingState.onChangeLoading(true);

    const sendTime = new Date();

    try {
      const result = await fb.api.sendMessage({
        teamDocId: team.id,
        teamName: team.teamName,
        buttonName: team.buttonName,
        userDocId: account.id,
        nickname: account.nickname,
        sendTime: dayjs(sendTime).format("YYYY.MM.DD HH:mm:ss"),
        timer: sendTime.getTime(),
      });

      if (result.error) {
        throw new Error("An error occurred during the notification sending process.");
      }

      if (result.success) {
        // 알림 발송 저장
        const notificationData = {
          teamDocId: team.id,
          userDocId: account.id,
          sendDate: dayjs(sendTime).format("YYYY.MM.DD"),
          sendTime: dayjs(sendTime).format("HH:mm"),
          textBody: result.data.textBody,
          timer: sendTime.getTime(),
        };

        await addDoc(collection(fb.db, "notifications"), notificationData);
      }
    } catch (e) {
      if (e instanceof FirestoreError) {
        Alert.error({ text: fb.errors(e.code) });
      } else if (e instanceof Error) {
        Alert.error({ text: fb.errors(e.message) });
      }
    } finally {
      loadingState.onChangeLoading(false);
    }
  }, []);

  const onLeaveTeam = useCallback(() => {
    Alert.confirm({
      html: "Do you want to leave the team?",
      action: async (result) => {
        if (result.isConfirmed && team) {
          loadingState.onChangeLoading(true);
          // 팀 떠나기 로직 실행
          try {
            // 팀 연결 링크 확인 (유저정보로 확인) - 유저코드: 팀코드 => 1:N
            const linkDocId = await fb.api.getLinkDocIdFromUserDocId(account.id);
            if (linkDocId === null) {
              throw new Error("");
            }

            // 팀 연결 링크 제거
            const linkDocRef = doc(fb.db, "/links", linkDocId);
            await deleteDoc(linkDocRef);

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
  }, [team, teamState, account, loadingState]);

  const isClick = useMemo(() => {
    const notificationData = account.notificationData;
    return notificationData?.sendDate === dayjs().format("YYYY.MM.DD");
  }, [account, account.notificationData]);

  // 알림 푸시 여부 실시간 구독
  useEffect(() => {
    let unSubscribe: Unsubscribe | null = null;

    if (team) {
      const notifyQuery = query(
        collection(fb.db, "notifications"),
        where("userDocId", "==", account.id),
        where("teamDocId", "==", team.id),
        where("sendDate", "==", dayjs().format("YYYY.MM.DD"))
      );

      unSubscribe = onSnapshot(notifyQuery, (snapshot) => {
        const notifications = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            teamDocId: data.teamDocId,
            userDocId: data.userDocId,
            sendDate: data.sendDate,
            sendTime: data.sendTime,
            textBody: data.textBody,
            timer: data.timer,
          };
        });

        if (notifications.length) {
          accountState.onChangeNotificationData(notifications[0]);
        }
      });
    }

    return () => {
      if (unSubscribe) {
        unSubscribe();
      }
    };
  }, [team]);

  return (
    <div className="w-full flex-1 flex flex-col">
      {team ? (
        <>
          <div className="w-full flex-1 flex flex-col justify-center items-center">
            <Button
              className={cls(
                isClick ? "btn-md-disabled" : "btn-md-style",
                "w-auto min-w-[130px] px-[20px]"
              )}
              disabled={isClick}
              onClick={onClick}
            >
              {team.teamName} {team.buttonName}
            </Button>
            <Spacing className="h-[5px]" />
            <Text as="p" className={cls("text-guide-style", isClick ? "text-cs-disabled" : "")}>
              {isClick ? "✔︎" : "💡"}{" "}
              {isClick
                ? `You clicked at ${account.notificationData?.sendTime}`
                : "Click to notify team members."}
            </Text>
          </div>
          <div className="w-full flex flex-col justify-center items-center">
            <Button
              className="btn-text-style text-md text-cs-primary whitespace-nowrap w-auto h-[25px] flex items-center gap-[5px]"
              onClick={onOpenModal}
            >
              <ReactIcon cursor="pointer" iconKey="list" color="#898121" size={16} />
              List of clicked USERS
            </Button>
            <Button
              type="button"
              className="btn-text-style whitespace-nowrap w-auto"
              onClick={onLeaveTeam}
            >
              LEAVE TEAM
            </Button>
          </div>
        </>
      ) : (
        <Navigate to="/" />
      )}
      <ModalContainer isOpen={isOpenModal} setIsOpen={setOpenModal}>
        {team?.id && <ClickedUsersModal teamDocId={team.id} />}
      </ModalContainer>
    </div>
  );
};
