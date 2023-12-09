import { LeavesIcon } from "@components/common/Icons";
import { Text } from "@components/common/Text";
import { useCallback } from "react";

type TProps = {
  id: string;
  isNotification: boolean;
  onChange?: (notification: boolean) => void;
};

const notification = ["Turn off notification", "Turn on notification"];

export const Toggle = ({ id, isNotification, onChange }: TProps) => {
  const onClick = useCallback(() => {
    onChange?.(!isNotification);
  }, [isNotification, onChange]);

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
        {notification[Number(isNotification)]}
      </Text>
      <label htmlFor={id} className="toggle-label-style" onClick={onClick}>
        <LeavesIcon iconColor={isNotification ? "#008E85" : "#C4C4C4"} />
      </label>
    </div>
  );
};
