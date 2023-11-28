import { Button } from "@components/common/Button";
import { Spacing } from "@components/common/Spacing";
import { Text } from "@components/common/Text";
import { DeleteAccount } from "@components/templates/DeleteAccount";
import { useNavigate } from "react-router";

export const NoTeamTemplate = () => {
  const navigate = useNavigate();

  const onCreateTeam = () => {
    navigate("/admin/setting");
  };

  return (
    <div className="w-full flex-1 flex flex-col">
      <div className="w-full flex-1 flex flex-col justify-center items-center">
        <Button className="btn-md-style" onClick={onCreateTeam}>
          CREATE
        </Button>
        <Spacing className="h-[5px]" />
        <Text as="p" className="text-guide-style">
          💡 Create a team and invite users.
        </Text>
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        <DeleteAccount />
      </div>
    </div>
  );
};
