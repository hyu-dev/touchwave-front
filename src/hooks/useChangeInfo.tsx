import { FirestoreError, doc, updateDoc } from "@firebase/firestore";
import { TChangeAccountEntries } from "@hooks/useAccount";
import { useOutletProps } from "@hooks/useOutletProps";
import { Alert } from "@utils/Alert";
import { fb } from "@utils/firebase";
import { useCallback, useMemo } from "react";
import Swal from "sweetalert2";

export const useChangeInfo = () => {
  const { account, accountState } = useOutletProps();

  const onChangeInfo = useCallback(
    (userDocId: string) => (contentId?: string) => () => {
      if (!contentId) {
        Alert.warning({ text: "An unexpected error occurred." });
        return;
      }

      const infoType = contentId as keyof TChangeAccountEntries;

      if (!account[infoType]) {
        Alert.warning({ text: "An unexpected error occurred." });
        return;
      }

      const title = `Change ${infoType}`;
      const text = `Enter the ${infoType} you want to change.`;

      Alert.input({
        title,
        text,
        input: "text",
        preConfirm: async (inputValue) => {
          try {
            if (!inputValue) {
              throw new Error(`Please enter a ${infoType}.`);
            }

            const docRef = doc(fb.db, "accounts", userDocId);
            await updateDoc(docRef, { [infoType]: inputValue });

            Alert.success({
              text: `You have successfully changed your ${infoType}`,
              action: () => {
                accountState.onChangeInfo({ [infoType]: inputValue });
              },
            });
          } catch (e) {
            if (e instanceof FirestoreError) {
              Swal.showValidationMessage(fb.errors(e.code));
            } else if (e instanceof Error) {
              Swal.showValidationMessage(e.message);
            }
          }
        },
      });
    },
    [accountState]
  );

  const returnProps = useMemo(() => ({ onChangeInfo }), [accountState]);

  return returnProps;
};
