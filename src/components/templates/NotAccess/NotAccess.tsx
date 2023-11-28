import { Button } from "@components/common/Button";
import { Spacing } from "@components/common/Spacing";
import { Text } from "@components/common/Text";
import { DeleteAccount } from "@components/templates/DeleteAccount";
import { MainHeader } from "@components/templates/Header";
import { SendEmail } from "@components/templates/NotAccess/SendEmail";
import { useOutletProps } from "@hooks/useOutletProps";
import { useSignOut } from "@hooks/useSignOut";
import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router";

export const NotAccessTemplate = () => {
  const navigate = useNavigate();
  const { account } = useOutletProps();
  const { onSignOut } = useSignOut();

  useEffect(() => {
    if (account.verify) {
      navigate("/");
    }
  }, [account]);

  return (
    <Fragment>
      <MainHeader />
      <main>
        <section className="p-0 justify-between items-center">
          <div className="flex flex-1 flex-col items-center">
            <Spacing className="h-[100px]" />
            <Text as="strong" className="text-xl text-cs-disabled whitespace-nowrap">
              Email verification is required
            </Text>
            <Spacing className="h-[20px]" />
            <Text as="p" className="text-lg text-center text-cs-disabled break-words">
              Please access your email to confirm authentication.
            </Text>
          </div>
          <div className="w-full flex flex-col justify-center items-center">
            <Text as="p" className="text-guide-style text-md">
              🥕 Didn't receive the verification email?
            </Text>
            <Spacing className="h-[15px]" />
            <SendEmail />
            <Spacing className="h-[15px]" />
            <Button
              type="button"
              className="btn-text-style h-[30px]"
              onClick={onSignOut(account.id)}
            >
              LOG OUT
            </Button>
            <DeleteAccount />
          </div>
        </section>
      </main>
    </Fragment>
  );
};
