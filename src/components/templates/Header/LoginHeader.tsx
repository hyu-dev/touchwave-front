import { Button } from "@components/common/Button";
import { Heading } from "@components/common/Heading";
import { ModalContainer } from "@components/common/Modal";
import { useCallback, useState } from "react";

type TProps = {
  role: "USER" | "ADMIN";
  modalElement: JSX.Element;
};

export const LoginHeader = ({ role, modalElement }: TProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const onOpenModal = useCallback(() => {
    setIsOpenModal(true);
  }, [setIsOpenModal]);

  return (
    <header className="relative">
      <Heading as="h1">TouchWave</Heading>
      <Button
        className="absolute top-[110px] right-[30px] z-10 font-point text-cs-primary"
        onClick={onOpenModal}
      >
        {role}
      </Button>
      <ModalContainer isOpen={isOpenModal} setIsOpen={setIsOpenModal}>
        {modalElement}
      </ModalContainer>
    </header>
  );
};
