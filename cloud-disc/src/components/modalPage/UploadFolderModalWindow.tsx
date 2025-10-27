"use client";
import { useState, useRef } from "react";
import { AiOutlineFolderAdd, AiOutlineFile } from "react-icons/ai";
import { useAlertStore } from "@/store/alertStore";
import { useFileStore } from "@/store/fileStore";
import { useModalStore } from "@/store/modalStore";

export default function UploadFolderModalWindow() {
  const [folderName, setFolderName] = useState<string | null>(null);
  const [allFiles, setAllFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const { setAlert } = useAlertStore();
  const { addFile, currentFolderUUID } = useFileStore();
  const { clearModalContent } = useModalStore();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const token = localStorage.getItem("access");

  const isAvailableForm = (type: string): boolean => {
    return (
      type === "application/pdf" ||
      type === "audio/mpeg" ||
      type === "video/mp4" ||
      type === "image/jpeg" ||
      type === "image/png"
    );
  };

  const handleFolderSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const folderRoot =
      files[0]?.webkitRelativePath?.split("/")[0] || "Новая папка";
    setFolderName(folderRoot);

    const validFiles = Array.from(files).filter((file) => {
      if (isAvailableForm(file.type)) return true;
      setAlert({ label: `Пропущен файл: ${file.name}`, color: "red" });
      return false;
    });

    setAllFiles(validFiles);
  };

  const ensureFolder = async (
    pathParts: string[],
    parentId: string
  ): Promise<string> => {
    if (pathParts.length === 0) return parentId;

    const current = pathParts.shift()!;
    const res = await fetch(`${API_URL}/storage/api/v3/folders/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: current, parent: parentId }),
    });

    if (!res.ok) throw new Error(`Ошибка создания папки ${current}`);
    const data = await res.json();
    return ensureFolder(pathParts, data.id);
  };

  const uploadFolder = async () => {
    if (!token) {
      setAlert({ label: "Вы не авторизованы", color: "red" });
      return;
    }

    if (!folderName || allFiles.length === 0) {
      setAlert({ label: "Папка не выбрана", color: "red" });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    console.log(currentFolderUUID);

    try {
      const rootRes = await fetch(`${API_URL}/storage/api/v3/folders/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: folderName, parent: currentFolderUUID }),
      });

      if (!rootRes.ok) throw new Error("Ошибка создания корневой папки");
      const rootData = await rootRes.json();
      const rootFolderId = rootData.id;

      addFile({
        type: "folder",
        name: folderName,
        parent: null,
        updateAt: new Date(),
        createAt: new Date(),
        id: rootFolderId,
        size: "",
        token: rootData.token,
      });

      const CHUNK_SIZE = 5 * 1024 * 1024;
      const totalSize = allFiles.reduce((sum, f) => sum + f.size, 0);
      let uploadedBytes = 0;

      for (const file of allFiles) {
        const relPath = file.webkitRelativePath.split("/");
        relPath.shift();

        const subfolders = relPath.slice(0, -1);
        let targetFolderId = rootFolderId;

        if (subfolders.length > 0) {
          targetFolderId = await ensureFolder([...subfolders], rootFolderId);
        }

        const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

        const initRes = await fetch(`${API_URL}/storage/api/v3/chunk_init/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            file_name: file.name,
            total_chunks: totalChunks,
            folder: targetFolderId,
          }),
        });

        if (!initRes.ok) throw new Error("Ошибка инициализации файла");
        const initData = await initRes.json();
        const uploadId = initData.upload_id;

        for (let i = 0; i < totalChunks; i++) {
          const start = i * CHUNK_SIZE;
          const end = Math.min(start + CHUNK_SIZE, file.size);
          const chunk = file.slice(start, end);

          const uploadRes = await fetch(
            `${API_URL}/storage/api/v3/chunk_upload/`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                "X-Upload-ID": uploadId,
                "X-Chunk-Index": i.toString(),
                "Content-Type": "application/octet-stream",
              },
              body: chunk,
            }
          );

          if (!uploadRes.ok) throw new Error("Ошибка загрузки чанка");

          uploadedBytes += chunk.size;
          setUploadProgress(Math.round((uploadedBytes / totalSize) * 100));
        }

        await fetch(`${API_URL}/storage/api/v3/chunk_complete/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            upload_id: uploadId,
            file_name: file.name,
            folder_id: targetFolderId,
          }),
        });
      }

      setAlert({ label: "Папка и файлы успешно загружены", color: "green" });
      setUploadProgress(100);
      setTimeout(clearModalContent, 1000);
    } catch (err) {
      console.error(err);
      setAlert({ label: "Ошибка загрузки папки", color: "red" });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-10 bg-white rounded-2xl w-[100%]">
      {!isUploading ? (
        <>
          <label htmlFor="uploadFolderInput">
            <div
              onDragOver={(e) => e.preventDefault()}
              className="border-dashed border-2 border-gray-300 flex flex-col items-center rounded-2xl p-7"
            >
              <AiOutlineFolderAdd className="w-14 h-14 text-gray-500" />
              <div className="p-2 text-lg">Выбрать папку для загрузки</div>
            </div>
          </label>

          <input
            ref={inputRef}
            type="file"
            id="uploadFolderInput"
            // @ts-ignore
            webkitdirectory="true"
            className="hidden"
            onChange={handleFolderSelect}
          />

          {folderName && (
            <>
              <p className="mt-3 text-gray-700 font-medium">
                Папка: {folderName} ({allFiles.length} файлов)
              </p>
              <div className="mt-2 h-20 overflow-y-auto">
                {allFiles.slice(0, 8).map((f) => (
                  <div
                    key={f.webkitRelativePath}
                    className="flex items-center text-gray-600 text-sm py-1"
                  >
                    <AiOutlineFile className="mr-2" /> {f.webkitRelativePath}
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="flex gap-2 mt-4">
            <button
              onClick={clearModalContent}
              className="flex-1 p-3 bg-red-100 rounded-xl hover:bg-red-200 transition-colors"
            >
              Отмена
            </button>
            <button
              onClick={uploadFolder}
              className="flex-1 p-3 bg-blue-100 rounded-xl hover:bg-blue-200 transition-colors"
            >
              Загрузить
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center p-10">
          <p className="text-lg font-semibold mb-4">Загрузка папки...</p>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-blue-500 h-4 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">{uploadProgress}%</p>
        </div>
      )}
    </div>
  );
}
