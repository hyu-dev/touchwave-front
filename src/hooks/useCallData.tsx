import { onAuthStateChanged } from "@firebase/auth";
import { FirestoreError, doc, updateDoc } from "@firebase/firestore";
import { onMessage } from "@firebase/messaging";
import { useAccountAction } from "@hooks/useAccount";
import { useLoadingState } from "@hooks/useLoading";
import { useTeamAction } from "@hooks/useTeam";
import { useToastState } from "@hooks/useToast";
import { Alert } from "@utils/Alert";
import { fb } from "@utils/firebase";
import dayjs from "dayjs";
import { useEffect, useMemo } from "react";

// 불러오기 일괄
export const useCallData = () => {
  const loadingState = useLoadingState();
  const accountState = useAccountAction();
  const teamState = useTeamAction();
  const toastState = useToastState();

  // 데이터 불러오기
  const initData = async () => {
    onAuthStateChanged(fb.auth, async (user) => {
      await fb.auth.authStateReady();
      loadingState.onChangeLoading(true);

      try {
        // 로그인이 안된 경우
        if (user === null) {
          accountState.onChangeAccount(null);
          fb.auth.signOut();
          return;
        }

        // 서버에서 유저정보 불러오기
        const userData = await fb.api.getUser(user.uid);

        if (!userData) {
          accountState.onChangeAccount(null);
          fb.auth.signOut();
          return;
        }

        // 권한 확인
        await fb.api.isNotification();

        // fcm 토큰 가져와서 유저정보 등록
        const token = await fb.api.getFCMToken();
        const docRef = doc(fb.db, "accounts", userData.id);

        // 이메일 인증여부가 저장된 정보와 다른 경우
        if (userData.verify !== user.emailVerified) {
          await updateDoc(docRef, { verify: user.emailVerified });
          userData.verify = user.emailVerified;
        }

        // 토큰 정보가 저장된 정보와 다른 경우
        if (userData.token !== token) {
          await updateDoc(docRef, { token });
          userData.token = token;
        }

        // 메세지 리스너 등록
        onMessage(fb.messaging, (payload) => {
          if (payload.data) {
            const title = payload.data.title;
            const body = payload.data.body;
            toastState.toastQueue.enqueue({ title, body });
            toastState.onRefresh();
          }
        });

        // 팀 정보 불러오기
        const team = await fb.api.getTeamFromUserDocId(userData.id);

        if (team) {
          userData.notificationData = await fb.api.getUserNotification(
            userData.id,
            team.id,
            dayjs().format("YYYY.MM.DD")
          );
        }

        // 계정 정보 등록
        accountState.onChangeAccount(userData);
        // 팀정보 등록
        teamState.onChangeTeam(team);
      } catch (e) {
        if (e instanceof FirestoreError) {
          Alert.error({ text: fb.errors(e.code) });
        } else if (e instanceof Error) {
          Alert.error({
            text: e.message,
            action: () => {
              accountState.onChangeAccount(null);
              fb.auth.signOut();
            },
          });
        }
      } finally {
        loadingState.onChangeLoading(false);
      }
    });
  };

  useEffect(() => {
    initData();
  }, []);

  const resultProps = useMemo(
    () => ({
      accountState,
      teamState,
    }),
    [accountState, teamState]
  );

  return resultProps;
};
