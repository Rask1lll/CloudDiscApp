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
      className="absolute w-dvw h-dvh flex justify-center bg-[#7e7d7d6b] items-center"
      onClick={(e) => {
        if (e.target === modalRef.current) {
          clearModalContent();
        }
      }}
    >
      <div className="relative z-10">
        <button
          className="absolute z-100 right-[7%] top-4 font-semibold text-xl"
          onClick={() => {
            clearModalContent();
          }}
        >
          X
        </button>
        {modalContent}
      </div>
    </div>
  );
}
