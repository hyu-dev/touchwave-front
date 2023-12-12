import { Button } from "@components/common/Button";
import { Alert } from "@utils/Alert";
import { useCallback } from "react";

export const Guide = () => {
  const onClick = useCallback(() => {
    Alert.basic({
      title: "Bug Inquiry",
      html: "Send an email to<br/>...",
    });
  }, []);

  return (
    <Button type="button" className="text-guide-style text-sm" onClick={onClick}>
      🚨 bug report
    </Button>
  );
};
