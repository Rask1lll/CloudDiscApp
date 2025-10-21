"use client";
import { useModalStore } from "@/store/modalStore";
import { useRef } from "react";
import { MdClose } from "react-icons/md";

export default function ModalWindow() {
  const { modalContent, clearModalContent } = useModalStore();
  const modalRef = useRef(null);

  if (!modalContent) return <div></div>;

  return (
    <div
      ref={modalRef}
      className="absolute w-dvw h-full flex justify-center bg-[#7e7d7d6b] items-center"
      onClick={(e) => {
        // if (e.target === modalRef.current) {
        //   clearModalContent();
        // }
      }}
    >
      <div className="relative z-10">
        <button
          className="absolute z-20 right-3 top-3 cursor-pointer font-semibold text-xl"
          onClick={() => {
            clearModalContent();
          }}
        >
          <MdClose className="w-7 h-7 text-gray-500" />
        </button>
        {modalContent}
      </div>
    </div>
  );
}
