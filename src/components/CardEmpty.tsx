import useModal from "@/hooks/useModal";
import { useCallback } from "react";
import { BiPlus } from "react-icons/bi";
import { ModalCard } from "./ModalCard";

export function CardEmpty() {
  const { setModalContent } = useModal();

  const handleOpenModal = useCallback(() => {
    setModalContent(ModalCard);
  }, [setModalContent]);
  return (
    <div className="flex h-48 w-[348px] flex-col items-center justify-center rounded-3xl bg-gradient-to-r from-[#042843] to-[#726E9E]">
      <button
        className="flex h-full w-full flex-col items-center justify-center outline-none hover:text-gray-300"
        onClick={handleOpenModal}
      >
        <BiPlus size={48} />
        <h3 className="text-lg font-bold">Novo cartão</h3>
      </button>
    </div>
  );
}
