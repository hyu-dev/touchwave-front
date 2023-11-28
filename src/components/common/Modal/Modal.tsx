import { CSSProperties, Dispatch, ReactNode, SetStateAction, useCallback, useMemo } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

type TProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  content?: CSSProperties;
  overlay?: CSSProperties;
  contentLabel?: string;
};

export const ModalContainer = ({
  isOpen,
  setIsOpen,
  children,
  content,
  overlay,
  contentLabel = "Modal",
}: TProps) => {
  const customStyles = useMemo(
    () => ({
      overlay: Object.assign(
        {
          background: "#00000040",
        },
        overlay
      ),
      content: Object.assign(
        {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          transform: "translate(-50%, -50%)",
        },
        content
      ),
    }),
    [content, overlay]
  );

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel={contentLabel}
    >
      {children}
    </Modal>
  );
};
