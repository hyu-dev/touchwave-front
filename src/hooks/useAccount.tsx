import { useCallback, useMemo, useState } from "react";

export type TNotificationData = {
  userDocId: string;
  teamDocId: string;
  sendDate: string;
  sendTime: string;
  textBody: string;
};

export type TChangeAccountEntries = Pick<TAccount, "nickname">;

export type TAccount = {
  id: string;
  userId: string;
  email: string;
  nickname: string;
  role: "USER" | "ADMIN";
  isNotification: boolean;
  lateAccessDate: number;
  token: string | null;
  verify: boolean;
  recentAuthEmailDate: number | null;
  notificationData?: TNotificationData | null;
};

export type TAccountAction = {
  account: TAccount | null;
  onChangeAccount: (account: TAccount | null) => void;
  onChangeAccountNotify: (isNotification: boolean) => void;
  onChangeRecentAuthEmailDate: (recentAuthEmailDate: number) => void;
  onChangeNotificationData: (notificationData?: TNotificationData | null) => void;
  onChangeInfo: (changeInfo: TChangeAccountEntries) => void;
};

export const useAccountAction = () => {
  const [account, setAccount] = useState<TAccount | null>();

  const onChangeAccount = useCallback(
    (account: TAccount | null) => {
      setAccount(account);
    },
    [setAccount]
  );

  const onChangeAccountNotify = useCallback(
    (isNotification: boolean) => {
      setAccount((prev) => (prev ? { ...prev, isNotification } : null));
    },
    [setAccount]
  );

  const onChangeRecentAuthEmailDate = useCallback((recentAuthEmailDate: number) => {
    setAccount((prev) => (prev ? { ...prev, recentAuthEmailDate } : null));
  }, []);

  const onChangeNotificationData = useCallback((notificationData: TNotificationData) => {
    setAccount((prev) => (prev ? { ...prev, notificationData } : null));
  }, []);

  const onChangeInfo = useCallback((changeInfo: TChangeAccountEntries) => {
    setAccount((prev) => (prev ? { ...prev, ...changeInfo } : null));
  }, []);

  const resultProps = useMemo(
    () => ({
      account,
      onChangeAccount,
      onChangeAccountNotify,
      onChangeRecentAuthEmailDate,
      onChangeNotificationData,
      onChangeInfo,
    }),
    [account]
  );

  return resultProps;
};
