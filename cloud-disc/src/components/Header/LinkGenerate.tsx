"use client";
import { useAlertStore } from "@/store/alertStore";
import { BsShare } from "react-icons/bs";

export default function LinkGenerate() {
  const { setAlert } = useAlertStore();
  async function copyLink() {
    await navigator.clipboard.writeText("http://localhost:3000/dashboard");
    setAlert("Ссылка была скопирована");
  }
  return (
    <div>
      <button
        onClick={copyLink}
        className="flex items-center gap-1 p-2 rounded-xl hover:cursor-pointer ring-gray-200 ring-1 hover:bg-purple-50 transition-colors duration-200"
      >
        <BsShare className="w-5 h-5" />
      </button>
    </div>
  );
}
