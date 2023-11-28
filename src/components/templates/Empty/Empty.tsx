import { MainHeader } from "@components/templates/Header";
import { Fragment } from "react";

export const EmptyTemplate = () => {
  return (
    <Fragment>
      <MainHeader />
      <main>
        <section></section>
      </main>
    </Fragment>
  );
};
