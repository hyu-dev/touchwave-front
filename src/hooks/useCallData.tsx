import { onAuthStateChanged } from "@firebase/auth";
import { FirestoreError, doc, updateDoc } from "@firebase/firestore";
import { FirebaseError } from "@firebase/util";
import { useAccountAction } from "@hooks/useAccount";
import { useLoadingState } from "@hooks/useLoading";
import { useTeamAction } from "@hooks/useTeam";
import { Alert } from "@utils/Alert";
import { fb } from "@utils/firebase";
import dayjs from "dayjs";
import { useEffect, useMemo } from "react";

// 불러오기 일괄
export const useCallData = () => {
  const loadingState = useLoadingState();
  const accountState = useAccountAction();
  const teamState = useTeamAction();

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

        let token: string | null = userData.token;
        let isNotification: boolean = userData.isNotification;
        const permission = await fb.api.isNotification();

        // fcm 토큰 가져와서 유저정보 등록
        if (permission === "granted") {
          token = await fb.api.getFCMToken();
          isNotification = true;
        }

        // 이메일 인증여부가 저장된 정보와 다른 경우
        if (userData.verify !== user.emailVerified) {
          userData.verify = user.emailVerified;
        }

        // 토큰 정보가 저장된 정보와 다른 경우
        if (userData.token !== token) {
          userData.token = token;
        }

        // 알림 정보가 다른 경우
        if (userData.isNotification !== isNotification) {
          userData.isNotification = isNotification;
        }

        // 유저 호출 쿼리
        const docRef = doc(fb.db, "accounts", userData.id);

        // 유저 정보 업데이트
        const userUpdateData = {
          verify: userData.verify,
          token: userData.token,
          isNotification: userData.isNotification,
        };

        await updateDoc(docRef, userUpdateData);

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
        } else if (e instanceof FirebaseError) {
          Alert.error({
            text: fb.errors(e.code),
            action: () => {
              accountState.onChangeAccount(null);
              fb.auth.signOut();
            },
          });
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
