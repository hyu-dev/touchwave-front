import { Text } from "@components/common/Text";
import { memo } from "react";

type TProps = {
  body: string;
};

export const Toast = memo(({ body }: TProps) => {
  return (
    <li className="animate-fade-in w-full px-[15px] py-[10px] rounded-[5px] bg-[#FFEEF4] border-[1px_solid_white] shadow-[2px_2px_5px_1px_#ffffff80] flex justify-center items-center">
      <Text as="p" className="whitespace-pre-wrap text-md font-point text-cs-text">
        {body}
      </Text>
    </li>
  );
});
