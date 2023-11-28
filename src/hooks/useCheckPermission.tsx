import { Alert } from "@utils/Alert";
import { fb } from "@utils/firebase";
import { useCallback, useEffect } from "react";

// 알림 권한 확인
export const useCheckPermission = () => {
  const checkPermission = useCallback(async () => {
    try {
      await fb.api.isNotification();
    } catch (e) {
      if (e instanceof Error) {
        Alert.warning({ text: e.message });
      }
    }
  }, []);

  useEffect(() => {
    checkPermission();
  }, []);
};
