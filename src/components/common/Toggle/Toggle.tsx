import { LeavesIcon } from "@components/common/Icons";
import { Text } from "@components/common/Text";
import { useCallback, useRef, useState } from "react";

type TProps = {
  id: string;
  isNotification: boolean;
  onChange?: (notification: boolean) => void;
};

const notification = ["Turn off notification", "Turn on notification"];

export const Toggle = ({ id, isNotification, onChange }: TProps) => {
  const [guide, setGuide] = useState(notification[Number(isNotification)]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setGuide(notification[Number(!isNotification)]);
    }, 200);
  }, [setGuide, isNotification]);

  const clearTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const onClick = useCallback(() => {
    onChange?.(!isNotification);
    clearTimer();
    startTimer();
  }, [isNotification, onChange, clearTimer, startTimer]);

  return (
    <div className="toggle-box-style">
      <input
        type="checkbox"
        id={id}
        className="toggle-input-style"
        checked={isNotification}
        readOnly
      />
      <Text as="p" className="toggle-text-style">
        {guide}
      </Text>
      <label htmlFor={id} className="toggle-label-style" onClick={onClick}>
        <LeavesIcon iconColor={isNotification ? "#008E85" : "#C4C4C4"} />
      </label>
    </div>
  );
};
