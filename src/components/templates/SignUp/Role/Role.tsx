import { Button } from "@components/common/Button";
import { Spacing } from "@components/common/Spacing";
import { Text } from "@components/common/Text";
import { TFormValue } from "@components/templates/SignUp/typed";
import { Alert } from "@utils/Alert";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router";

export const RoleTemplate = () => {
  const navigate = useNavigate();
  const { setValue } = useFormContext<TFormValue>();

  const onMove = (role: "USER" | "ADMIN") => () => {
    Alert.confirm({
      html: `Once you select a role,<br/>you cannot change it.`,
      action: (result) => {
        if (result.isConfirmed) {
          setValue("role", role);
          setValue("step", "register");
        }
      },
    });
  };

  const onCancel = () => {
    navigate("/");
  };

  return (
    <section className="justify-between items-center">
      <Spacing className="h-[50px]" />
      <div className="flex-1 flex flex-col items-center">
        <Text as="strong" className="text-cs-primary">
          Choose a role...
        </Text>
        <Spacing className="h-[20px]" />
        <Button type="button" className="btn-user-style" onClick={onMove("USER")}>
          USER
        </Button>
        <Spacing className="h-[5px]" />
        <Text as="p" className="text-guide-style">
          💡 You can join, leave, and click.
        </Text>
        <Spacing className="h-[50px]" />
        <Button type="button" className="btn-admin-style" onClick={onMove("ADMIN")}>
          ADMIN
        </Button>
        <Spacing className="h-[5px]" />
        <Text as="p" className="text-guide-style">
          💡 You can create and delete.
        </Text>
      </div>
      <div>
        <Button type="button" className="btn-text-style" onClick={onCancel}>
          CANCEL
        </Button>
      </div>
    </section>
  );
};
