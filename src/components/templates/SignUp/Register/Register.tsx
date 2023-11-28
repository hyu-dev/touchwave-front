import { Button } from "@components/common/Button";
import { Input } from "@components/common/Input";
import { Label } from "@components/common/Label";
import { Spacing } from "@components/common/Spacing";
import { Text } from "@components/common/Text";
import { TFormValue } from "@components/templates/SignUp/typed";
import { Alert } from "@utils/Alert";
import { regexp } from "@utils/constant";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router";

export const RegisterTemplate = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<TFormValue>();

  const navigate = useNavigate();

  const inputProps = useMemo(
    () => ({
      nickname: {
        id: "nicknameInput",
        type: "text",
        placeholder: "Please enter your nickname.",
        register: register("nickname", {
          required: true,
          pattern: regexp.nickname,
        }),
      },
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
          pattern: regexp.password,
        }),
      },
    }),
    [register]
  );

  const cancel = () => {
    Alert.confirm({
      html: `Do you want to cancel registration?`,
      action: (result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      },
    });
  };

  return (
    <section>
      <Spacing className="h-[30px]" />
      <div className="w-full flex-1 flex flex-col">
        <div className="w-full">
          <Label className="font-mono" htmlFor="nicknameInput">
            nickname
          </Label>
          <Spacing className="h-[15px]" />
          {Input<"nickname">(inputProps.nickname)}
          <Text as="p" className="text-error-style h-[35px] px-[10px]">
            {errors.nickname?.type === "pattern" &&
              "✘ Within 15 Korean characters or uppercase or lowercase letters."}
          </Text>
        </div>
        <div className="w-full relative">
          <Label className="font-mono" htmlFor="emailInput">
            email
          </Label>
          <Spacing className="h-[15px]" />
          {Input<"email">(inputProps.email)}
          <Text as="p" className="text-error-style h-[35px] px-[10px]">
            {errors.email?.type === "pattern" && "✘ Invalid pattern."}
          </Text>
        </div>
        <div className="w-full">
          <Label className="font-mono" htmlFor="passwordInput">
            password
          </Label>
          <Spacing className="h-[15px]" />
          {Input<"password">(inputProps.password)}
          <Text as="p" className="text-error-style h-[35px] px-[10px]">
            {errors.password?.type === "pattern" &&
              "✘ At least 8 characters including uppercase or lowercase letters, special characters, and numbers."}
          </Text>
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        <Button type="submit" className="btn-md-style">
          SIGN UP
        </Button>
        <Button type="button" className="btn-text-style" onClick={cancel}>
          CANCEL
        </Button>
      </div>
    </section>
  );
};
