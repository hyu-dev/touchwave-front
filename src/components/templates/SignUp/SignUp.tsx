import { MainHeader, RegisterHeader } from "@components/templates/Header";
import { RegisterTemplate } from "@components/templates/SignUp/Register";
import { RoleTemplate } from "@components/templates/SignUp/Role";
import { TFormValue } from "@components/templates/SignUp/typed";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { addDoc, collection } from "@firebase/firestore";
import { FirebaseError } from "@firebase/util";
import { useLoadingState } from "@hooks/useLoading";
import { Alert } from "@utils/Alert";
import { fb } from "@utils/firebase";
import { useCallback, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router";

export const SignUpTemplate = () => {
  const { loading, onChangeLoading } = useLoadingState();

  const navigate = useNavigate();

  const methods = useForm<TFormValue>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      step: "role",
    },
  });

  const step = methods.watch("step");
  const role = methods.watch("role");

  const onSubmit = useCallback(
    ({ role, email, password, nickname }: TFormValue) => {
      Alert.confirm({
        html: `Are you going to join?`,
        action: async (result) => {
          if (loading) return;

          if (result.isConfirmed) {
            onChangeLoading(true);

            try {
              // 인증 등록
              const credentials = await createUserWithEmailAndPassword(fb.auth, email, password);

              // 서버 저장
              const sendData = {
                userId: credentials.user.uid,
                email,
                nickname,
                role,
                isNotification: false,
                lateAccessDate: new Date().getTime(),
                token: null,
                verify: false,
                recentAuthEmailDate: null,
              };

              await addDoc(collection(fb.db, "accounts"), sendData);
            } catch (e) {
              if (e instanceof FirebaseError) {
                Alert.error({ html: fb.errors(e.code) });
              }
            } finally {
              onChangeLoading(false);
              navigate("/not-access");
            }
          }
        },
      });
    },
    [onChangeLoading, loading]
  );

  useEffect(() => {
    if (loading) {
      onChangeLoading(false);
    }
  }, [loading]);

  return (
    <FormProvider {...methods}>
      {
        {
          role: <MainHeader />,
          register: <RegisterHeader role={role} />,
        }[step]
      }
      <main>
        <form
          className="w-full flex-1 flex flex-col justify-center"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          {
            {
              role: <RoleTemplate />,
              register: <RegisterTemplate />,
            }[step]
          }
        </form>
      </main>
    </FormProvider>
  );
};
