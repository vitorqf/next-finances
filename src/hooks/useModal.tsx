"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from "react";

type ModalContextType = {
  setModalContent: Dispatch<SetStateAction<ReactNode | undefined>>;
};

const ModalContext = createContext<ModalContextType>({
  setModalContent: () => {
    console.error("No modal context provided");
  },
});

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalContent, setModalContent] = useState<ReactNode>();

  const handleCloseModal = useCallback(() => {
    setModalContent(undefined);
  }, []);

  return (
    <ModalContext.Provider value={{ setModalContent }}>
      {modalContent && (
        <div
          className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50"
          onClick={handleCloseModal}
        >
          <div onClick={(e) => e.stopPropagation()}>{modalContent}</div>
        </div>
      )}
      {children}
    </ModalContext.Provider>
  );
};

const useModal = () => useContext(ModalContext);

export default useModal;
