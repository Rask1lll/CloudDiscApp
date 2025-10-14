"use client";
import { useModalStore } from "@/store/modalStore";
import { useRef } from "react";

export default function ModalWindow() {
  const { modalContent, clearModalContent } = useModalStore();
  const modalRef = useRef(null);

  if (!modalContent) return <div></div>;

  return (
    <div
      ref={modalRef}
      className="absolute w-dvw h-dvh flex justify-center items-center"
      onClick={(e) => {
        if (e.target === modalRef.current) {
          clearModalContent();
        }
      }}
    >
      <div>{modalContent}</div>
    </div>
  );
}
