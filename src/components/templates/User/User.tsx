import { Spacing } from "@components/common/Spacing";
import { LoginHeader } from "@components/templates/Header";
import { Info } from "@components/templates/Info";
import { UserInviteTemplate } from "@components/templates/User/Invitation";
import { UserTeamTemplate } from "@components/templates/User/Team";
import { useChangeToggle } from "@hooks/useChangeToggle";
import { useOutletProps } from "@hooks/useOutletProps";
import { useSignOut } from "@hooks/useSignOut";
import { Fragment } from "react";

export const UserTemplate = () => {
  const { account, teamState } = useOutletProps();
  const { onSignOut } = useSignOut();
  const { onChangeNotification } = useChangeToggle();

  return (
    <Fragment>
      <LoginHeader
        role="USER"
        modalElement={
          <Info
            userName={account.nickname}
            userEmail={account.email}
            isNotification={account.isNotification}
            onChange={onChangeNotification(account.id)}
            onSignOut={onSignOut(account.id)}
          />
        }
      />
      <main>
        <section className="relative">
          <Spacing className="h-[30px]" />
          {teamState.team ? <UserTeamTemplate /> : <UserInviteTemplate />}
        </section>
      </main>
    </Fragment>
  );
};
