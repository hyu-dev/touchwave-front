import { ArticleBox } from "@components/common/Box";
import { Button } from "@components/common/Button";
import { Heading } from "@components/common/Heading";
import { Spacing } from "@components/common/Spacing";
import { Toggle } from "@components/common/Toggle";
import { useChangeInfo } from "@hooks/useChangeInfo";
import { useChangeToggle } from "@hooks/useChangeToggle";
import { useSignOut } from "@hooks/useSignOut";
import { memo } from "react";

type TProps = {
  userDocId: string;
  userEmail: string;
  userName: string;
  isNotification: boolean;
};

export const Info = memo(({ userDocId, userName, userEmail, isNotification }: TProps) => {
  const { onSignOut } = useSignOut();
  const { onChangeNotification } = useChangeToggle();
  const { onChangeInfo } = useChangeInfo();

  return (
    <article>
      <Heading as="h2" className="text-cs-admin">
        Information
      </Heading>
      <Spacing className="h-[20px]" />
      <ArticleBox title="email" content={userEmail} />
      <Spacing className="h-[10px]" />
      <ArticleBox
        title="nickname"
        content={userName}
        contentId="nickname"
        onClick={onChangeInfo(userDocId)}
      />
      <Spacing className="h-[20px]" />
      <Toggle
        id="notificationInput"
        isNotification={isNotification}
        onChange={onChangeNotification(userDocId)}
      />
      <Spacing className="h-[20px]" />
      <Button className="btn-logout-style" onClick={onSignOut(userDocId)}>
        LOGOUT
      </Button>
    </article>
  );
});
