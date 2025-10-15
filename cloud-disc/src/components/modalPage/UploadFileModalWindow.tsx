"use client";
import { useRef, useState } from "react";
import { AiOutlineFile, AiOutlineUpload } from "react-icons/ai";

export default function UploadFileModalWindow() {
  const [files, setFiles] = useState<FileList | null>();
  const [filesCount, setFilesCount] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileNames, setFileNames] = useState<[string]>();

  const addInputToFiles = function (filesToAdd: FileList) {
    for (let index = 0; index < filesToAdd.length; index++) {
      const fileFromInput = filesToAdd[index];
      setFileNames((prevItems) => [...prevItems, fileFromInput.name]);
    }
  };

  const renderUploadFiles = function () {
    if (inputRef.current) {
      const filesElement = inputRef.current;
      if (!filesElement.files) return;
      setFilesCount(filesElement.files?.length);
      const allFile = filesElement.files;
      setFiles(allFile);
      addInputToFiles(allFile);
    }
  };
  return (
    <div className="p-10 rounded-xl bg-white w-[100%]">
      <label htmlFor="uploadInput">
        <div
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={(e) => {
            e.preventDefault();
            console.log(e.dataTransfer.files);
            addInputToFiles(e.dataTransfer.files);
          }}
          className="border-dashed border-2 border-gray-300 flex flex-col items-center rounded-2xl p-7 px-10 lg:p-10 lg:px-12"
        >
          <AiOutlineUpload className="w-14 h-14 text-gray-500 lg:w-18 lg:h-18" />
          <div className="p-2 lg:text-xl">Загрузить файлы</div>
        </div>
      </label>
      <input
        ref={inputRef}
        type="file"
        name="uploadInput"
        id="uploadInput"
        multiple
        className="hidden"
        onChange={renderUploadFiles}
      />
      <p className="text-sm font-semibold text-gray-500 mt-2">
        {filesCount === 0 ? (
          <>Нету выбранных файлов</>
        ) : (
          <>Выбранно файлов:{filesCount}</>
        )}
      </p>
      <div className="max-w-[225px] lg:max-w-[350px] flex gap-2 overflow-x-scroll h-16 py-1 pl-2">
        {!!fileNames &&
          fileNames.map((el) => {
            return (
              <div
                key={el}
                className="bg-gray-50 max-w-[200px] rounded-xl ring-1 ring-gray-300 text-left overflow-x-clip  items-center flex text-nowrap"
              >
                <div>
                  <AiOutlineFile className="h-7 w-7" />
                </div>
                {el}
              </div>
            );
          })}
      </div>
      <button className="p-4 w-full bg-blue-300 rounded-2xl mt-5">
        Загрузить файлы
      </button>
    </div>
  );
}
