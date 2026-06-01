"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full";
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export default function CustomModal({
  isOpen,
  onClose,
  title,
  size = "md",
  children,
  footer,
  className = "",
}: CustomModalProps) {
  return (
    <Modal isOpen={isOpen} placement="center" size={size} onClose={onClose}>
      <ModalContent className={className}>
        {() => (
          <>
            {title && (
              <ModalHeader className="flex flex-col gap-1 text-center mr-auto" >{title}</ModalHeader>
            )}
            <ModalBody className={` ${!title ? "pt-6" : "pt-0"} max-h-[80vh] overflow-y-auto ${className}`} >{children}</ModalBody>
            {/* <ModalFooter>
              {footer && (
                footer
              ) 
              }
            </ModalFooter> */}
          </>
        )}
      </ModalContent>
      <ModalFooter>
        {footer && (
          footer
        )}
      </ModalFooter>
    </Modal>
  );
}
