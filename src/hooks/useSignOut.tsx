import { FirestoreError, doc, updateDoc } from "@firebase/firestore";
import { useLoadingState } from "@hooks/useLoading";
import { Alert } from "@utils/Alert";
import { fb } from "@utils/firebase";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const useSignOut = () => {
  const navigate = useNavigate();

  const loadingState = useLoadingState();

  const onSignOut = useCallback(
    (userDocId: string) => () => {
      Alert.confirm({
        html: "Are you sure you want to log out?",
        action: async (result) => {
          if (result.isConfirmed) {
            try {
              loadingState.onChangeLoading(true);
              const docRef = doc(fb.db, "accounts", userDocId);

              await updateDoc(docRef, { token: null });

              fb.auth.signOut();

              navigate("/login");
            } catch (e) {
              if (e instanceof FirestoreError) {
                Alert.error({ html: fb.errors(e.code) });
              }
            } finally {
              loadingState.onChangeLoading(false);
            }
          }
        },
      });
    },
    [loadingState]
  );

  return { onSignOut };
};
