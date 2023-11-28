import { Toast } from "@components/common/Toast";
import { TToastData, useToastState } from "@hooks/useToast";
import { Queue } from "@utils/queue";
import { useEffect, useMemo, useState } from "react";

export const ToastListTemplate = () => {
  const toastState = useToastState();
  const timeoutQueue = useMemo(() => new Queue<NodeJS.Timeout>(), []);
  const [toastList, setToastList] = useState<TToastData[]>([]);

  useEffect(() => {
    if (toastState.toastQueue.size()) {
      setToastList(toastState.toastQueue.toastDatalist);

      const timeout = setTimeout(() => {
        toastState.toastQueue.dequeue();
        setToastList(toastState.toastQueue.toastDatalist);
        toastState.onRefresh();

        const timeout = timeoutQueue.dequeue();
        if (timeout) {
          clearTimeout(timeout.data);
        }
      }, 5000);

      timeoutQueue.enqueue(timeout);
    }
  }, [toastState]);

  return (
    <ul className="absolute top-[10px] left-[80px] z-10 w-[200px] max-h-[130px] flex flex-col items-center gap-[10px]">
      {toastList?.map((data) => (
        <Toast key={data.body} body={data.body} />
      ))}
    </ul>
  );
};
