import { Button } from "@components/common/Button";
import { sendPasswordResetEmail } from "@firebase/auth";
import { FirestoreError } from "@firebase/firestore";
import { Alert } from "@utils/Alert";
import { fb } from "@utils/firebase";
import { useCallback } from "react";
import Swal from "sweetalert2";

export const FindPassword = () => {
  const onFindPassword = useCallback(() => {
    Alert.input({
      title: "Please enter your email",
      text: "A password reset email will be sent to the email address you entered",
      preConfirm: async (email) => {
        try {
          // 가입된 사용자인지 확인
          const verifyUser = await fb.api.verifyUserByEmail(email);
          if (!verifyUser) {
            throw new Error("Your email does not exist.");
          }
          // 가입된 사용자면 메일 발송
          await sendPasswordResetEmail(fb.auth, email);

          Alert.success({ text: "The email has been sent successfully." });
        } catch (e) {
          if (e instanceof FirestoreError) {
            Swal.showValidationMessage(fb.errors(e.code));
          } else if (e instanceof Error) {
            Swal.showValidationMessage(e.message);
          }
        }
      },
    });
  }, []);

  return (
    <Button type="button" className="text-guide-style text-md" onClick={onFindPassword}>
      🥕 Forgot your password?
    </Button>
  );
};
