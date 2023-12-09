import { FirestoreError, doc, updateDoc } from "@firebase/firestore";
import { useOutletProps } from "@hooks/useOutletProps";
import { Alert } from "@utils/Alert";
import { fb } from "@utils/firebase";
import { useCallback, useMemo } from "react";

export const useChangeToggle = () => {
  const { account, accountState } = useOutletProps();

  const onChangeNotification = useCallback(
    (userDocId: string) => async (notification: boolean) => {
      try {
        let isNotification = notification;
        let token = account.token;

        if (isNotification) {
          const permission = await fb.api.isNotification();
          isNotification = permission === "granted";

          if (isNotification) {
            token = await fb.api.getFCMToken();
          } else {
            Alert.warning({ html: "Please allow notifications to use the app." });
          }
        }

        const docRef = doc(fb.db, "accounts", userDocId);
        await updateDoc(docRef, { isNotification, token });
        accountState.onChangeAccountNotify(isNotification);
      } catch (e) {
        if (e instanceof FirestoreError) {
          Alert.error({ html: fb.errors(e.code) });
        }
      }
    },
    [accountState, account]
  );

  const returnProps = useMemo(() => ({ onChangeNotification }), [onChangeNotification]);

  return returnProps;
};
