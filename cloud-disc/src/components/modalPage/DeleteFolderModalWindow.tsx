"use client";
import { useState } from "react";
import { useModalStore } from "@/store/modalStore";
import { useFileStore } from "@/store/fileStore";

export default function DeleteFolderModalWindow({
  fileName,
  fileId,
}: {
  fileName: string;
  fileId: string;
}) {
  const [loading, setLoading] = useState(false);
  const { clearModalContent } = useModalStore();
  const { files, setFiles } = useFileStore();

  const deleteFolder = async () => {
    if (!confirm(`Удалить папку "${fileName}" и все её вложения?`)) return;

    setLoading(true);
    const token = localStorage.getItem("access");
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    try {
      const response = await fetch(
        `${API_URL}/storage/folders/${fileId}/delete/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Ошибка удаления: ${errorText}`);
      }

      const data = await response.json();
      alert(data.message || "Папка успешно удалена");

      setFiles(files.filter((f) => f.id !== fileId));
      clearModalContent();
    } catch (err) {
      console.error("Ошибка при удалении:", err);
      alert("Не удалось удалить папку");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-opacity-50">
      <div className="bg-white rounded-2xl p-6 shadow-2xl w-[350px]">
        <div className="flex flex-col mb-6">
          <h2 className="text-basic font-bold text-gray-700">Удалить папку</h2>
          <p className="text-gray-500 text-sm mt-1">
            Вы уверены, что хотите удалить <b>{fileName}</b> и все вложения?
          </p>
        </div>

        <div className="flex space-x-3 pt-2">
          <button
            onClick={clearModalContent}
            disabled={loading}
            className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all"
          >
            Отмена
          </button>

          <button
            onClick={deleteFolder}
            disabled={loading}
            className={`flex-1 px-6 py-3 rounded-xl bg-red-200 hover:bg-red-400 duration-200 font-medium transition-all ${
              loading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {loading ? "Удаление..." : "Удалить"}
          </button>
        </div>
      </div>
    </div>
  );
}
