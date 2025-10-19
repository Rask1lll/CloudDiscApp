"use client";
import { useFileStore } from "@/store/fileStore";
import { useModalStore } from "@/store/modalStore";
import { useRef, useState } from "react";
import { AiOutlineFile, AiOutlineUpload } from "react-icons/ai";

export default function UploadFileModalWindow() {
  const [filesCount, setFilesCount] = useState<number>(0);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [allFilesToUpload, setAllFilesToUpload] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const { addFileArray, currentFolderUUID } = useFileStore();
  const { clearModalContent } = useModalStore();

  const MAX_FILES = 5;

  const isDuplicate = (file: File, existing: File[]) => {
    return existing.some((f) => f.name === file.name && f.size === file.size);
  };

  const addInputToFiles = (filesToAdd: FileList) => {
    let updatedFiles = [...allFilesToUpload];

    for (let i = 0; i < filesToAdd.length; i++) {
      const file = filesToAdd[i];
      if (!isDuplicate(file, updatedFiles)) {
        updatedFiles.push(file);
      }
    }

    if (updatedFiles.length > MAX_FILES) {
      alert(`Можно загрузить не более ${MAX_FILES} файлов за раз`);
      updatedFiles = updatedFiles.slice(0, MAX_FILES);
    }

    setAllFilesToUpload(updatedFiles);
    setFilesCount(updatedFiles.length);
    setFileNames(updatedFiles.map((f) => f.name));
  };

  const renderUploadFiles = () => {
    const filesElement = inputRef.current;
    if (!filesElement?.files) return;
    addInputToFiles(filesElement.files);
  };

  const uploadFile = async () => {
    const CHUNK_SIZE = 10 * 1024 * 1024;
    const token = localStorage.getItem("access");
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const now = new Date();
    let filetoken;

    if (!token) {
      alert("Вы не авторизованы!");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    let totalUploaded = 0;
    const totalFilesSize = allFilesToUpload.reduce((sum, f) => sum + f.size, 0);

    for (const file of allFilesToUpload) {
      try {
        const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

        const initResp = await fetch(`${API_URL}/storage/api/v3/chunk_init/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            file_name: file.name,
            total_chunks: totalChunks,
            folder: currentFolderUUID,
          }),
        });

        if (!initResp.ok) throw new Error("Ошибка инициализации загрузки");

        const initData = await initResp.json();
        const uploadId = initData.upload_id;
        if (!uploadId) throw new Error("upload_id не получен от сервера");

        for (let i = 0; i < totalChunks; i++) {
          const start = i * CHUNK_SIZE;
          const end = Math.min(start + CHUNK_SIZE, file.size);
          const chunk = file.slice(start, end);

          const uploadResp = await fetch(
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

          if (!uploadResp.ok) {
            const errText = await uploadResp.text();
            throw new Error(`Ошибка при загрузке чанка ${i}: ${errText}`);
          }

          totalUploaded += chunk.size;
          setUploadProgress(Math.round((totalUploaded / totalFilesSize) * 100));
        }

        const completeResp = await fetch(
          `${API_URL}/storage/api/v3/chunk_complete/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              upload_id: uploadId,
              file_name: file.name,
              folder_id: currentFolderUUID,
            }),
          }
        );

        if (!completeResp.ok) throw new Error("Ошибка завершения загрузки");

        const completeData = await completeResp.json();
        console.log("✅ Файл успешно собран:", completeData);
      } catch (err) {
        console.error("Ошибка загрузки файла:", file.name, err);
      }
    }

    const readyResult = allFilesToUpload.map((el) => ({
      id: Date.now().toString() + Math.random().toString(36).slice(2),
      name: el.name,
      type: el.type,
      size: `${(el.size / 1024 / 1024).toFixed(2)} MB`,
      createAt: now,
      updateAt: now,
      parent: currentFolderUUID,
      token: "",
    }));

    addFileArray(readyResult);
    setUploadProgress(100);
    setTimeout(clearModalContent, 600);
  };

  return (
    <div className="p-10 rounded-xl bg-white w-[100%]">
      {!isUploading ? (
        <>
          <label htmlFor="uploadInput">
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                addInputToFiles(e.dataTransfer.files);
              }}
              className="border-dashed border-2 border-gray-300 flex flex-col items-center rounded-2xl p-7 px-10 lg:p-10 lg:px-12"
            >
              <AiOutlineUpload className="w-14 h-14 text-gray-500 lg:w-18 lg:h-18" />
              <div className="p-2 lg:text-xl">Загрузить файлы (до 5)</div>
            </div>
          </label>

          <input
            ref={inputRef}
            type="file"
            id="uploadInput"
            multiple
            className="hidden"
            onChange={renderUploadFiles}
          />

          <p className="text-sm font-semibold text-gray-500 mt-2">
            {filesCount === 0
              ? "Нет выбранных файлов"
              : `Выбрано файлов: ${filesCount}`}
          </p>

          <div className="max-w-[225px] lg:max-w-[350px] flex gap-2 overflow-x-scroll h-16 py-1 pl-2">
            {fileNames.map((el) => (
              <div
                key={el}
                className="bg-gray-50 max-w-[200px] rounded-xl ring-1 ring-gray-300 text-left overflow-x-clip items-center flex text-nowrap"
              >
                <AiOutlineFile className="h-7 w-7 mr-1" />
                {el}
              </div>
            ))}
          </div>

          <div className="flex gap-2 mt-3">
            <button
              className="p-4 text-base hover:bg-red-200 transition-colors duration-200 py-3 flex-1 bg-red-100 rounded-2xl"
              onClick={clearModalContent}
            >
              Отмена
            </button>
            <button
              onClick={uploadFile}
              className="p-4 py-2 hover:bg-blue-200 transition-colors duration-200 text-base flex-1 bg-blue-100 rounded-2xl"
            >
              Загрузить
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center p-10">
          <p className="text-lg font-semibold mb-4">Загрузка файлов...</p>
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
