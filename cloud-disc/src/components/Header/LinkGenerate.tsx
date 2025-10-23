"use client";
import { useAlertStore } from "@/store/alertStore";
import { BsShare } from "react-icons/bs";

export default function LinkGenerate() {
  const { setAlert } = useAlertStore();

  async function copyLink() {
    try {
      const link = window.location.href;
      if (
        navigator &&
        navigator.clipboard &&
        typeof navigator.clipboard.writeText === "function"
      ) {
        await navigator.clipboard.writeText(link);
      } else {
        const input = document.createElement("input");
        input.value = link;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
      }

      setAlert({
        label: "Ссылка была скопирована",
        color: "green",
      });
    } catch (err) {
      console.error("Ошибка копирования ссылки:", err);
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
