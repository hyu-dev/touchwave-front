import { Button } from "@components/common/Button";
import { deleteUser } from "@firebase/auth";
import { FirestoreError, deleteDoc, doc } from "@firebase/firestore";
import { FirebaseError } from "@firebase/util";
import { useLoadingState } from "@hooks/useLoading";
import { useOutletProps } from "@hooks/useOutletProps";
import { Alert } from "@utils/Alert";
import { fb } from "@utils/firebase";
import { memo } from "react";
import { useNavigate } from "react-router";

export const DeleteAccount = memo(() => {
  const navigate = useNavigate();
  const { account } = useOutletProps();
  const { onChangeLoading } = useLoadingState();

  const onDeleteAccount = () => {
    Alert.confirm({
      html: "Are you sure you want to delete your account? If you delete it, the registered information cannot be recovered.",
      action: async (result) => {
        if (result.isConfirmed) {
          try {
            onChangeLoading(true);

            const user = fb.auth.currentUser;

            if (user) {
              // firestore 계정 삭제
              const docRef = doc(fb.db, "accounts", account.id);
              await deleteDoc(docRef);

              // 인증 계정 삭제
              await deleteUser(user);
            }

            navigate("/login");
          } catch (e) {
            if (e instanceof FirebaseError) {
              Alert.error({ text: fb.errors(e.code) });
            } else if (e instanceof FirestoreError) {
              Alert.error({ text: fb.errors(e.code) });
            }
          } finally {
            onChangeLoading(false);
          }
        }
      },
    });
  };

  return (
    <Button
      type="button"
      className="btn-text-style whitespace-nowrap w-auto"
      onClick={onDeleteAccount}
    >
      DELETE ACCOUNT
    </Button>
  );
});
