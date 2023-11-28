import { LoadingTemplate } from "@components/templates/Loading";
import { LazyExoticComponent, Suspense } from "react";

export const Loadable =
  (Component: LazyExoticComponent<() => JSX.Element>, fallback?: JSX.Element) => () =>
    (
      <Suspense fallback={fallback ?? <LoadingTemplate />}>
        <Component />
      </Suspense>
    );
