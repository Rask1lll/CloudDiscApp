"use client";
import { useAlertStore } from "@/store/alertStore";
import { folder, file, useFileStore } from "@/store/fileStore";
import { useModalStore } from "@/store/modalStore";
import { useEffect, useState } from "react";
import { BiFolder } from "react-icons/bi";
import { BsCheck, BsSearch } from "react-icons/bs";

export default function MoveFileModal({
  fileName,
  fileId,
}: {
  fileName: string;
  fileId: string;
}) {
  const { files, setFiles } = useFileStore();
  const { setAlert } = useAlertStore();
  const { clearModalContent } = useModalStore();

  const [folders, setFolders] = useState<(folder | file)[]>([]);
  const [chosenFile, setChosenFile] = useState<string>();
  let timeOut: ReturnType<typeof setTimeout>;

  async function moveFile() {
    const token = localStorage.getItem("access");
    const request = JSON.stringify({
      file_id: fileId,
      folder_token: chosenFile,
    });

    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/storage/api/v3/files_move/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
          body: request,
        }
      );
      setFiles(files.filter((el) => el.id !== fileId));
      setAlert({ label: "Файл был перемещен", color: "green" });
      clearModalContent();
    } catch (e) {
      console.error(e);
      setAlert({ label: "Ошибка при перемещении", color: "red" });
    }
  }

  function choseFile(token: string) {
    setChosenFile(token);
  }

  async function getFolderByParam(searchParam: string) {
    const request = JSON.stringify({ name: searchParam });
    const token = localStorage.getItem("access");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/storage/api/v3/folders_search/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
          body: request,
        }
      );

      const searchRes = await res.json();

      // Если сервер возвращает один объект
      if (searchRes && searchRes.name) {
        const folderObj: folder = {
          id: searchRes.id,
          name: searchRes.name,
          token: searchRes.token,
          type: "folder",
          size: "0",
          createAt: searchRes.created_at ?? "",
          updateAt: searchRes.updated_at ?? "",
          parent: searchRes.parent ?? null, // <-- добавлено
        };
        setFolders([folderObj]);
      }
      // Если массив
      else if (Array.isArray(searchRes) && searchRes.length > 0) {
        const folderList: folder[] = searchRes.map((f: any) => ({
          id: f.id,
          name: f.name,
          token: f.token,
          type: "folder",
          size: "0",
          createAt: f.created_at ?? "",
          updateAt: f.updated_at ?? "",
          parent: f.parent ?? null, // <-- добавлено
        }));
        setFolders(folderList);
      } else {
        setFolders([]);
      }
    } catch (error) {
      console.error("Ошибка при поиске папки:", error);
      setFolders([]);
    }
  }

  function searchFolder(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target.value;
    if (!input || input.trim() === "") {
      clearTimeout(timeOut);
      setFolders(files.filter((el) => el.type === "folder"));
    } else {
      if (timeOut) clearTimeout(timeOut);
      timeOut = setTimeout(() => {
        getFolderByParam(input);
      }, 1000);
    }
  }

  useEffect(() => {
    setFolders(files.filter((el) => el.type === "folder"));
  }, []);

  return (
    <div className="lg:w-200 xl:w-300 pt-10 bg-white rounded-sm">
      <div className="h-12 pr-4 p-2 line-clamp-1 text-nowrap overflow-hidden text-ellipsis border-b border-gray-400">
        <span className="font-semibold text-gray-500">Переместить файл:</span>{" "}
        {fileName}
      </div>

      <div className="h-[calc(100vh-200px)] p-[2%] flex-col gap-4 flex items-center">
        {/* Поиск */}
        <div className="w-full">
          <div className="rounded-xl flex px-2 items-center ring ring-gray-200 w-full">
            <input
              type="text"
              className="py-2 p-1 w-[100%]"
              placeholder="Поиск папок для перемещения"
              onChange={searchFolder}
            />
            <BsSearch className="w-5 h-5" />
          </div>
        </div>

        {/* Список папок */}
        <div className="h-[60%] w-full mt-2 ring-1 ring-gray-200 rounded-3xl overflow-y-scroll">
          {folders.length > 0 ? (
            folders.map((folder) => (
              <FolderToMove
                key={folder.token}
                choseFile={choseFile}
                isChosen={folder.token === chosenFile}
                folderName={folder.name}
                token={folder.token}
              />
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              Ничего не найдено
            </div>
          )}
        </div>

        {/* Кнопка */}
        <div className="w-[95%] flex justify-end">
          <button
            onClick={moveFile}
            disabled={!chosenFile}
            className={`p-3 ring-1 transition-all duration-150 rounded-2xl ${
              !chosenFile
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer ring-green-300 bg-green-200 hover:bg-green-100"
            }`}
          >
            Переместить
          </button>
        </div>
      </div>
    </div>
  );
}

function FolderToMove({
  folderName,
  isChosen,
  choseFile,
  token,
}: {
  folderName: string;
  isChosen: boolean;
  choseFile: (token: string) => void;
  token: string;
}) {
  return (
    <div
      onClick={() => choseFile(token)}
      className={`w-full p-4 flex items-center even:bg-[#f2f0f0] gap-3 cursor-pointer border-b border-gray-100 hover:bg-white ${
        isChosen ? "bg-green-50" : "bg-gray-50"
      }`}
    >
      {isChosen && (
        <div className="min-w-7 bg-green-200 rounded-full">
          <BsCheck className="w-7 h-7" />
        </div>
      )}
      <BiFolder className="w-5 h-5 text-gray-700" />
      <span>{folderName}</span>
    </div>
  );
}
