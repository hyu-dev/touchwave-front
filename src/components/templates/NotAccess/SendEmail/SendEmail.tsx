import { Button } from "@components/common/Button";
import { Text } from "@components/common/Text";
import { sendEmailVerification } from "@firebase/auth";
import { doc, updateDoc } from "@firebase/firestore";
import { FirebaseError } from "@firebase/util";
import { useLoadingState } from "@hooks/useLoading";
import { useOutletProps } from "@hooks/useOutletProps";
import { Alert } from "@utils/Alert";
import { cls } from "@utils/classname";
import { fb } from "@utils/firebase";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

export const SendEmail = memo(() => {
  const DAY = useMemo(() => 1000 * 60 * 60 * 24, []);
  const loadingState = useLoadingState();
  const { account, accountState } = useOutletProps();
  const intervalId = useRef<NodeJS.Timeout | null>(null);

  const getTime = useCallback((now: number, recent: number) => {
    if (recent === 0) {
      return null;
    }
    const remain = recent + DAY - now;
    const days = Math.floor(remain / (1000 * 60 * 60 * 24));
    const hours = Math.floor(remain / (1000 * 60 * 60));
    const mins = Math.floor(remain / (1000 * 60));
    const secs = Math.floor(remain / 1000);

    const h = String(hours - days * 24).padStart(2, "0");
    const m = String(mins - hours * 60).padStart(2, "0");
    const s = String(secs - mins * 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  }, []);

  const [timer, setTimer] = useState<string | null>(
    getTime(new Date().getTime(), account.recentAuthEmailDate ?? 0)
  );

  const sendVerify = useCallback(async () => {
    const user = fb.auth.currentUser;

    if (user && user.email) {
      loadingState.onChangeLoading(true);

      try {
        // 최근 발송일 확인 (24시간 기준 1회만 발송)
        if (account.recentAuthEmailDate) {
          // 현재 날짜
          const nowDate = new Date().getTime();
          // 발송가능여부
          const isSendable = account.recentAuthEmailDate + DAY - nowDate;

          // 발송가능 날짜가 더 크면 보내면 x
          if (isSendable > 0) {
            throw new Error(`You have already sent the authentication email.`);
          }
        }

        const actionCodeSettings = {
          url: process.env.FIREBASE_HOSTING_URL ?? "",
          handleCodeInApp: true,
        };
        // 이메일 인증 메일 발송
        await sendEmailVerification(user, actionCodeSettings);

        // 이메일 발송일자 업데이트
        const docRef = doc(fb.db, "accounts", account.id);
        const recentAuthEmailDate = new Date().getTime();
        await updateDoc(docRef, { recentAuthEmailDate });
        accountState.onChangeRecentAuthEmailDate(recentAuthEmailDate);

        Alert.success({ text: "The email has been sent successfully." });
      } catch (e) {
        if (e instanceof FirebaseError) {
          Alert.error({ html: fb.errors(e.code) });
        } else if (e instanceof Error) {
          Alert.warning({ html: e.message });
        }
      } finally {
        loadingState.onChangeLoading(false);
      }
    }
  }, [loadingState, account.id, account.recentAuthEmailDate]);

  const clearTimer = useCallback(() => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    clearTimer();

    intervalId.current = setInterval(() => {
      // 현재 날짜
      const nowTime = new Date().getTime();
      const sendableTime = DAY + (account.recentAuthEmailDate ?? 0);

      // 현재시간보다 발송가능시간이 더 큰 경우 (아직 발송불가)
      if (sendableTime - nowTime > 0) {
        setTimer(getTime(nowTime, account.recentAuthEmailDate ?? 0));
      } else {
        setTimer(null);
        clearTimer();
      }
    }, 1000);
  }, [clearTimer, setTimer, account.recentAuthEmailDate]);

  useEffect(() => {
    startTimer();

    return () => {
      clearTimer();
    };
  }, [account.recentAuthEmailDate]);

  return (
    <Button
      type="button"
      className={cls("relative", !!timer ? "btn-md-disabled" : "btn-md-style")}
      disabled={!!timer}
      onClick={sendVerify}
    >
      {timer ?? "SEND"}
      {!!timer && (
        <Text
          as="p"
          className={cls(
            "text-guide-style text-cs-disabled hidden absolute top-[40px] left-[50%] translate-x-[-50%] whitespace-nowrap",
            !!timer ? "btn-hover" : ""
          )}
        >
          You have already sent the authentication email.
        </Text>
      )}
    </Button>
  );
});
