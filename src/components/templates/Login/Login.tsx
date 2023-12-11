import { Button } from "@components/common/Button";
import { Input } from "@components/common/Input";
import { Label } from "@components/common/Label";
import { Spacing } from "@components/common/Spacing";
import { Text } from "@components/common/Text";
import { MainHeader } from "@components/templates/Header";
import { FindPassword } from "@components/templates/Login/FindPassword";
import { Guide } from "@components/templates/Login/Guide";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { FirebaseError } from "@firebase/util";
import { useLoadingState } from "@hooks/useLoading";
import { Alert } from "@utils/Alert";
import { regexp } from "@utils/constant";
import { fb } from "@utils/firebase";
import { Fragment, useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

export type TFormValue = {
  email: string;
  password: string;
};

export const LoginTemplate = () => {
  const { loading, onChangeLoading } = useLoadingState();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormValue>({
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const inputProps = useMemo(
    () => ({
      email: {
        id: "emailInput",
        type: "email",
        placeholder: "Please enter your email address.",
        register: register("email", {
          required: true,
          pattern: regexp.email,
        }),
      },
      password: {
        id: "passwordInput",
        type: "password",
        placeholder: "Please enter your password.",
        register: register("password", {
          required: true,
        }),
      },
    }),
    [register]
  );

  const onSubmit = useCallback(
    async ({ email, password }: TFormValue) => {
      try {
        onChangeLoading(true);
        // 유저 인증
        await signInWithEmailAndPassword(fb.auth, email, password);
      } catch (e) {
        if (e instanceof FirebaseError) {
          Alert.error({ html: fb.errors(e.code) });
        }
      } finally {
        onChangeLoading(false);
        navigate("/");
      }
    },
    [onChangeLoading, navigate]
  );

  const onMove = useCallback(() => {
    navigate("/signup");
  }, [navigate]);

  useEffect(() => {
    if (loading) {
      onChangeLoading(false);
    }
  }, [loading]);

  return (
    <Fragment>
      <MainHeader />
      <main>
        <section>
          <Spacing className="h-[60px]" />
          <form className="w-full flex-1 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full flex-1 flex flex-col">
              <Label className="font-point" htmlFor="emailInput">
                email
              </Label>
              <Spacing className="h-[15px]" />
              {Input<"email">(inputProps.email)}
              <Text as="p" className="text-error-style h-[35px] px-[10px]">
                {errors.email?.type === "pattern" && "✘ Invalid pattern."}
              </Text>
              <Label className="font-point" htmlFor="passwordInput">
                password
              </Label>
              <Spacing className="h-[15px]" />
              {Input<"password">(inputProps.password)}
            </div>
            <div className="w-full flex flex-col gap-[10px] text-center h-[100px]">
              <FindPassword />
              <Guide />
            </div>
            <div className="w-full flex flex-col justify-center items-center">
              <Button type="submit" className="btn-md-style">
                LOGIN
              </Button>
              <Button type="button" className="btn-text-style" onClick={onMove}>
                SIGN UP
              </Button>
            </div>
          </form>
        </section>
      </main>
    </Fragment>
  );
};
