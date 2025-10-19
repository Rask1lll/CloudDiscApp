"use client";
import { useFileStore } from "@/store/fileStore";
import { useModalStore } from "@/store/modalStore";
import { useRef } from "react";
import { BiFolderPlus } from "react-icons/bi";

export default function FolderCreateModalWindow() {
  const inputRef = useRef<null | HTMLInputElement>(null);
  const { addFile, currentFolderUUID } = useFileStore();
  const { clearModalContent } = useModalStore();

  async function createFolder() {
    const folderName = inputRef.current?.value;

    if (!folderName) return;
    const token = localStorage.getItem("access");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/storage/api/v3/folders/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: folderName, parent: currentFolderUUID }),
      }
    );

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Ошибка создания папки");
    }

    const fullRes = await res.json();
    addFile({
      type: "folder",
      name: folderName,
      parent: null,
      updateAt: new Date(),
      createAt: new Date(),
      id: folderName,
      size: "",
      token: fullRes.token,
    });

    clearModalContent();
  }

  return (
    <div className="bg-opacity-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <BiFolderPlus className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Новая папка</h2>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Название папки
            </label>
            <input
              type="text"
              className="w-full p-4 ring-1 ring-gray-400 rounded-md"
              placeholder="Название Папки "
              ref={inputRef}
            />
          </div>

          <div className="flex space-x-3 pt-2">
            <button className="flex-1 px-6 py-3 bg-red-100 text-gray-700 rounded-xl font-medium hover:bg-red-200 pointer transition-all">
              Отмена
            </button>
            <button
              onClick={createFolder}
              className={`flex-1 px-6 py-3 rounded-xl hover:bg-blue-400 duration-200 cursor-pointer font-medium transition-all`}
            >
              Создать
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
