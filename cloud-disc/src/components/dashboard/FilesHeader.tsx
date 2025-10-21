"use client";
import { useUserStore } from "@/store/userStore";

export default function FilesHeader() {
  const { status } = useUserStore();

  return (
    <div className="w-full bg-gray-50 border-b border-gray-300 font-semibold text-gray-700 hidden md:block">
      <div
        className={`grid items-center text-sm px-5 py-3 ${
          status
            ? "grid-cols-[40px_2fr_1fr_1fr_1fr_100px]"
            : "grid-cols-[40px_2fr_1fr_1fr_1fr]"
        }`}
      >
        <div></div>
        <div>Имя</div>
        <div>Тип</div>
        <div>Размер</div>
        <div>Создано</div>
        {status && <div className="text-right pr-5">Действия</div>}
      </div>
    </div>
  );
}
