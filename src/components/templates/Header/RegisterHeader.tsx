import { Heading } from "@components/common/Heading";
import { TRole } from "@components/templates/SignUp/typed";

type TProps = {
  role?: TRole;
};

export const RegisterHeader = ({ role }: TProps) => {
  return (
    <header>
      <Heading as="h2" className="text-cs-primary">
        {role}
      </Heading>
    </header>
  );
};
