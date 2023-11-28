import { Queue } from "@utils/queue";
import { ReactNode, createContext, useCallback, useContext, useMemo, useState } from "react";

const ToastContext = createContext<TToastAction | null>(null);

type TProps = {
  children: ReactNode;
};

export const ToastProvider = ({ children }: TProps) => {
  const state = useToast();

  return <ToastContext.Provider value={state}>{children}</ToastContext.Provider>;
};

type TToastAction = {
  toastQueue: Queue<TToastData>;
  onRefresh: () => void;
};

export type TToastData = {
  title: string;
  body: string;
};

export const useToastState = () => {
  const state = useContext(ToastContext);

  if (!state) {
    throw new Error("ToastProvider is not found");
  }

  return state;
};

const useToast = (): TToastAction => {
  const toastQueue = useMemo(() => new Queue<TToastData>(), []);
  const [update, forceUpdate] = useState({});

  const onRefresh = useCallback(() => {
    forceUpdate({});
  }, [forceUpdate]);

  const resultProps = useMemo(() => ({ toastQueue, onRefresh }), [update]);

  return resultProps;
};
