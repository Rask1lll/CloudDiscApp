"use client";
import { useAlertStore } from "@/store/alertStore";
import { BsShare } from "react-icons/bs";

export default function MakeLink({ link }: { link: string }) {
  const { setAlert } = useAlertStore();
  async function copyLink() {
    try {
      if (window.isSecureContext && navigator.clipboard) {
        await navigator.clipboard.writeText(link);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = link;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }

      setAlert({ label: "Ссылка была скопирована", color: "green" });
    } catch (err) {
      console.error("Ошибка копирования:", err);
      setAlert({ label: "Не удалось скопировать ссылку", color: "red" });
    }
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
