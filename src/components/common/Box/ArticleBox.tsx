import { Text } from "@components/common/Text";
import { cls } from "@utils/classname";
import { memo } from "react";

type TProps = {
  title: string;
  content: string;
  onClick?: (contentId?: string) => () => void;
  contentId?: string;
  cursor?: "cursor-default" | "cursor-pointer";
};

export const ArticleBox = memo(
  ({ title, content, contentId, onClick, cursor = "cursor-default" }: TProps) => {
    return (
      <article
        className={cls(
          "min-w-[300px] shadow-[5px_5px_10px_0_#00000040] text-lg py-[10px] px-[15px]",
          cursor
        )}
        onClick={onClick?.(contentId)}
      >
        <Text as="strong" className="text-cs-title">
          {title}
        </Text>
        <Text id={contentId} as="p" className="text-cs-disabled text-md font-medium">
          {content}
        </Text>
      </article>
    );
  }
);
