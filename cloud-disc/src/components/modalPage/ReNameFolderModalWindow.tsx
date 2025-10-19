"use client";

import { useRef, useState } from "react";
import { useModalStore } from "@/store/modalStore";
import { AiOutlineFolder } from "react-icons/ai";
import { useFileStore } from "@/store/fileStore";

export default function ReNameFolderModalWindow({
  fileName,
  fileToken,
  fileId,
}: {
  fileName: string;
  fileToken: string;
  fileId: string;
}) {
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);
  const { clearModalContent } = useModalStore();
  const { files, setFiles } = useFileStore();

  const reName = async () => {
    const newName = nameInputRef.current?.value?.trim();
    if (!newName) {
      alert("Введите новое имя папки");
      return;
    }

    setLoading(true);
    const token = localStorage.getItem("access");
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    try {
      const response = await fetch(
        `${API_URL}/storage/folders/${fileId}/update/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: newName,
            parent: null,
          }),
        }
      );

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Ошибка: ${errText}`);
      }

      const data = await response.json();
      console.log("✅ Папка переименована:", data);
      setFiles(
        files.map((f) => (f.id === fileId ? { ...f, name: newName } : f))
      );
      alert(`Папка успешно переименована в "${newName}"`);
      clearModalContent();
    } catch (error) {
      console.error("Ошибка при переименовании:", error);
      alert("Не удалось переименовать папку");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-opacity-50">
      <div className="bg-white rounded-2xl p-6 shadow-2xl w-[350px]">
        <div className="flex items-center mb-6 gap-2">
          <AiOutlineFolder className="w-8 h-8" />
          <div className="flex flex-col">
            <h2 className="text-basic font-bold text-gray-900">
              Переименовать папку
            </h2>
            <span className="font-medium text-gray-600 text-sm mt-1">
              Текущее имя: {fileName}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            className="w-full p-4 ring-1 ring-gray-400 rounded-md focus:ring-blue-400 focus:ring-2 outline-none"
            placeholder="Новое название"
            ref={nameInputRef}
          />

          <div className="flex space-x-3 pt-2">
            <button
              onClick={clearModalContent}
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all"
            >
              Отмена
            </button>
            <button
              onClick={reName}
              disabled={loading}
              className={`flex-1 px-6 py-3 rounded-xl bg-blue-100 hover:bg-blue-300 duration-200 font-medium transition-all ${
                loading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {loading ? "Переименование..." : "Переименовать"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
