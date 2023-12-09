import { fb } from "@utils/firebase";
import { useEffect } from "react";

// firebase messaging cloud service worker 등록
export const RegisterServiceWorker = () => {
  useEffect(() => {
    fb.api.getOrRegisterServiceWorker();
  }, []);

  return null;
};
