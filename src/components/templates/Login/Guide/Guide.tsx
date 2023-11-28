import { Button } from "@components/common/Button";
import { Alert } from "@utils/Alert";
import { useCallback } from "react";

export const Guide = () => {
  const onClick = useCallback(() => {
    Alert.basic({
      title: "Send notification once a day",
      html: "It's simple to use.<br/>Administrators can create teams. Users can belong to teams and send notifications. That's it!<br/>If there is an error while using it, please report it to hyu630115@gmail.com.",
    });
  }, []);

  return (
    <Button type="button" className="text-guide-style text-sm" onClick={onClick}>
      🍩 Do you want a guide?
    </Button>
  );
};
