import { Spacing } from "@components/common/Spacing";
import { LoginHeader } from "@components/templates/Header";
import { Info } from "@components/templates/Info";
import { useOutletProps } from "@hooks/useOutletProps";
import { Fragment } from "react";
import { Outlet } from "react-router";

export const AdminTemplate = () => {
  const { account, accountState, teamState } = useOutletProps();

  return (
    <Fragment>
      <LoginHeader
        role="ADMIN"
        modalElement={
          <Info
            userName={account.nickname}
            userEmail={account.email}
            isNotification={account.isNotification}
            userDocId={account.id}
          />
        }
      />
      <main>
        <section className="relative">
          <Spacing className="h-[30px]" />
          <Outlet context={{ account, accountState, teamState }} />
        </section>
      </main>
    </Fragment>
  );
};
