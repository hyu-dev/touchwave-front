import { Heading } from "@components/common/Heading";
import { TRole } from "@components/templates/SignUp/typed";

type TProps = {
  role?: TRole;
};

export const RegisterHeader = ({ role }: TProps) => {
  return (
    <header>
      <Heading as="h1" className="absolute top-0 left-[5px] text-base">
        TouchWave
      </Heading>
      <Heading as="h2" className="text-cs-primary">
        {role}
      </Heading>
    </header>
  );
};
