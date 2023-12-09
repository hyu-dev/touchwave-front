import { onMessage } from "@firebase/messaging";
import { useToastState } from "@hooks/useToast";
import { fb } from "@utils/firebase";
import { useEffect } from "react";

// firebase messaging cloud service worker 등록 및 메시지 리스너 등록
export const RegisterServiceWorker = () => {
  const toastState = useToastState();

  useEffect(() => {
    fb.api.getOrRegisterServiceWorker();

    // 메세지 리스너 등록
    onMessage(fb.messaging, (payload) => {
      if (payload.notification) {
        const title = payload.notification.title ?? "";
        const body = payload.notification.body ?? "";
        toastState.toastQueue.enqueue({ title, body });
        toastState.onRefresh();
      }
    });
  }, []);

  return null;
};
