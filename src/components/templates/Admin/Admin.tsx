import { Spacing } from "@components/common/Spacing";
import { LoginHeader } from "@components/templates/Header";
import { Info } from "@components/templates/Info";
import { FirestoreError, doc, updateDoc } from "@firebase/firestore";
import { useOutletProps } from "@hooks/useOutletProps";
import { useSignOut } from "@hooks/useSignOut";
import { Alert } from "@utils/Alert";
import { fb } from "@utils/firebase";
import { Fragment, useCallback } from "react";
import { Outlet } from "react-router";

export const AdminTemplate = () => {
  const { account, accountState, teamState } = useOutletProps();
  const { onSignOut } = useSignOut();

  const onChangeNotification = useCallback(
    (userDocId: string) => async (notification: boolean) => {
      try {
        const docRef = doc(fb.db, "accounts", userDocId);

        await updateDoc(docRef, { isNotification: notification });

        accountState.onChangeAccountNotify(notification);
      } catch (e) {
        if (e instanceof FirestoreError) {
          Alert.error({ html: fb.errors(e.code) });
        }
      }
    },
    [accountState]
  );

  return (
    <Fragment>
      <LoginHeader
        role="ADMIN"
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
          <Outlet context={{ account, accountState, teamState }} />
        </section>
      </main>
    </Fragment>
  );
};
