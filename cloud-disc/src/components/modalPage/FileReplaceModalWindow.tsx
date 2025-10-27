"use client";
import { useAlertStore } from "@/store/alertStore";
import { useFileStore } from "@/store/fileStore";
import { useState, useRef, useEffect } from "react";
import {
  AiOutlineFile,
  AiOutlineUpload,
  AiOutlineCheckCircle,
} from "react-icons/ai";
import Loading from "../loading/Loading";
import { useModalStore } from "@/store/modalStore";

export default function FileReplaceModalWindow({
  fileName,
  fileId,
  fileToken,
}: {
  fileName: string;
  fileId: string;
  fileToken: string;
}) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { files, setFiles } = useFileStore();
  const { setAlert } = useAlertStore();
  const { clearModalContent } = useModalStore();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const isAvailableForm = (type: string): boolean => {
    return (
      type === "application/pdf" ||
      type === "audio/mpeg" ||
      type === "video/mp4" ||
      type === "image/jpeg" ||
      type === "image/png"
    );
  };

  useEffect(() => {
    if (selectedFile?.type) {
      if (!isAvailableForm(selectedFile.type)) {
        setAlert({ label: "Не верный формат данных", color: "red" });
        setSelectedFile(null);
      }
    }
  }, [selectedFile]);

  async function replaceFile() {
    const formData = new FormData();
    if (!selectedFile) return;
    formData.append("file", selectedFile);
    const token = localStorage.getItem("access");
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/storage/api/v3/files_replace/${fileId}/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const reRes = await res.json();
      console.log(reRes);

      const replaceUi = files.map((el) => {
        if (el.id == fileId) {
          el.name = reRes.name;
          el.type = reRes.file_type;
          return el;
        }
        return el;
      });
      setFiles(replaceUi);
      setLoading(false);
      clearModalContent();
    } catch (e) {
      setLoading(false);
      setAlert({ label: "Ошибка при замене файла", color: "red" });
    }
  }

  return (
    <div className="bg-white relative rounded-2xl shadow-lg w-full max-w-lg p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Замена файла
      </h1>

      {loading && (
        <div className="absolute flex w-full h-[80%] top-b left-0 justify-center items-center backdrop-blur-[2px]">
          <Loading />
        </div>
      )}

      {!isUploading ? (
        <>
          <label
            onDrop={(e) => {
              e.preventDefault();
              setSelectedFile(e.dataTransfer.files[0]);
            }}
            onDragOver={(e) => {
              e.preventDefault();
            }}
            htmlFor="replaceFileInput"
          >
            <div className="border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center p-10 cursor-pointer transition-all">
              <AiOutlineUpload className="w-16 h-16 text-gray-500" />
              <p className="mt-3 text-gray-600">
                Нажмите или перетащите новый файл для замены
              </p>
            </div>
          </label>

          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileSelect}
            name="replaceFileInput"
            id="replaceFileInput"
          />

          {selectedFile && (
            <div className="mt-6 flex items-center bg-gray-50 rounded-xl ring-1 ring-gray-300 p-3">
              <AiOutlineFile className="w-6 h-6 text-gray-600 mr-2" />
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-gray-800 font-medium">
                  {selectedFile.name}
                </p>
                <p className="text-gray-500 text-sm">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-6">
            <button
              disabled={!selectedFile}
              onClick={replaceFile}
              className={`flex-1 py-3 rounded-xl transition-all ${
                selectedFile
                  ? "bg-blue-100 hover:bg-blue-200 text-blue-800"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              Заменить
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center">
          {uploadProgress < 100 ? (
            <>
              <p className="text-lg font-semibold mb-4">Загрузка...</p>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-blue-500 h-4 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">{uploadProgress}%</p>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <AiOutlineCheckCircle className="text-green-500 w-16 h-16 mb-3" />
              <p className="text-lg font-semibold text-gray-700">
                Файл успешно заменён!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
