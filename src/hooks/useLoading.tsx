import { ReactNode, createContext, useContext, useMemo, useState } from "react";

export type TLoadingAction = {
  loading: boolean;
  onChangeLoading: (loading: boolean) => void;
};

const LoadingContext = createContext<TLoadingAction | null>(null);

type TProps = {
  children: ReactNode;
};

export const LoadingProvider = ({ children }: TProps) => {
  const state = useLoading();

  return <LoadingContext.Provider value={state}>{children}</LoadingContext.Provider>;
};

export const useLoadingState = () => {
  const state = useContext(LoadingContext);

  if (!state) {
    throw new Error("LoadingProvider is not found");
  }

  return state;
};

const useLoading = () => {
  const [loading, setLoading] = useState(true);

  const onChangeLoading = (loading: boolean) => {
    setLoading(loading);
  };

  const resultProps = useMemo(() => ({ loading, onChangeLoading }), [loading]);

  return resultProps;
};
