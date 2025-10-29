"use client";
import { useAlertStore } from "@/store/alertStore";
import { BsShare } from "react-icons/bs";

export default function MakeLink({ link }: { link: string }) {
  const { setAlert } = useAlertStore();
  async function copyLink() {
    setAlert({ label: "Ссылка была скопирована", color: "green" });
    await navigator.clipboard.writeText(link);
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
