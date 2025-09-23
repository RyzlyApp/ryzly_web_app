"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { BiX, BiArrowBack } from "react-icons/bi";

interface ModalContextType {
  openModal: (
    content: ReactNode,
    title?: string,
    fullScreenMobile?: boolean
  ) => void;
  closeModal: () => void;
  isOpen: boolean;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [modal, setModal] = useState<{
    isOpen: boolean;
    content: ReactNode | null;
    title?: string;
    fullScreenMobile?: boolean;
  }>({
    isOpen: false,
    content: null,
    title: undefined,
    fullScreenMobile: false,
  });

  const openModal = (
    content: ReactNode,
    title?: string,
    fullScreenMobile: boolean = false
  ) => {
    setModal({
      isOpen: true,
      content,
      title,
      fullScreenMobile,
    });
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModal({
      isOpen: false,
      content: null,
      title: undefined,
      fullScreenMobile: false,
    });
    document.body.style.overflow = "unset";
  };

  const MobileModalHeader = () => (
    <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-sm p-4 h-[70px] flex items-center justify-between">
      <button onClick={closeModal} className="p-1">
        <BiArrowBack size={20} />
      </button>
      <h2 className="text-lg font-semibold flex-1 text-center">
        {modal.title || ""}
      </h2>
      <button
        onClick={closeModal}
        className="p-1 lg:hidden"
        aria-label="Close modal"
      >
        <BiX size={24} />
      </button>
    </div>
  );

  return (
    <ModalContext.Provider
      value={{ openModal, closeModal, isOpen: modal.isOpen }}
    >
      {children}
      {modal.isOpen && (
        <>
          <div className="hidden lg:flex fixed inset-0 z-50 items-center justify-center bg-black/50">
            <div className="relative bg-white rounded-xl p-5 max-w-md w-full mx-4">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                aria-label="Close modal"
              >
                <BiX size={24} />
              </button>
              {modal.content}
            </div>
          </div>

          {modal.fullScreenMobile ? (
            <div className="lg:hidden fixed inset-0 z-50 bg-[#F6F6F9] overflow-y-auto px-[5%] pt-24">
              <MobileModalHeader />
              <div className="pb-6 px-4 bg-white shadow rounded-lg">
                {modal.content}
              </div>
            </div>
          ) : (
            <div className="lg:hidden fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
              <div className="relative bg-white rounded-xl p-5 w-full max-w-md mx-auto">
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                  aria-label="Close modal"
                >
                  <BiX size={24} />
                </button>
                {modal.content}
              </div>
            </div>
          )}
        </>
      )}
    </ModalContext.Provider>
  );
};
