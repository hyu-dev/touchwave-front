import { ArticleBox } from "@components/common/Box";
import { Button } from "@components/common/Button";
import { Heading } from "@components/common/Heading";
import { Spacing } from "@components/common/Spacing";
import { Toggle } from "@components/common/Toggle";

type TProps = {
  userEmail: string;
  userName: string;
  isNotification: boolean;
  onChange?: (notification: boolean) => Promise<void>;
  onSignOut?: () => void;
};

export const Info = ({ userName, userEmail, isNotification, onChange, onSignOut }: TProps) => {
  return (
    <article>
      <Heading as="h2" className="text-cs-admin">
        Information
      </Heading>
      <Spacing className="h-[20px]" />
      <ArticleBox title="email" content={userEmail} />
      <Spacing className="h-[10px]" />
      <ArticleBox title="nickname" content={userName} />
      <Spacing className="h-[20px]" />
      <Toggle id="notificationInput" isNotification={isNotification} onChange={onChange} />
      <Spacing className="h-[20px]" />
      <Button className="btn-logout-style" onClick={onSignOut}>
        LOGOUT
      </Button>
    </article>
  );
};
