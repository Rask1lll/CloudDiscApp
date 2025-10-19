"use client";
import { BiQrScan } from "react-icons/bi";
import { useModalStore } from "@/store/modalStore";
import QRModalWindow from "../modalPage/QRmodalWindow";
export default function QRGenerateBtn() {
  const { setModalContent } = useModalStore();
  return (
    <div>
      <button
        onClick={() => {
          setModalContent(<QRModalWindow />);
        }}
        className="flex items-center gap-1 p-2 ring-1 rounded-xl hover:cursor-pointer hover:bg-purple-50 transition-colors duration-200 ring-gray-200 hover:ring-1"
      >
        <BiQrScan className="w-5 h-5" />
      </button>
    </div>
  );
}
