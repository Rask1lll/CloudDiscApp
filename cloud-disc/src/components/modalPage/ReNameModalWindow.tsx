"use client";

import { useRef } from "react";

export default function ReNameModalDefault({ fileName }: { fileName: string }) {
  const nameInputRef = useRef<null | HTMLInputElement>(null);
  const reName = function () {
    const newName = nameInputRef.current?.value;
    console.log(newName);
  };
  return (
    <div className="bg-opacity-50">
      <div className="bg-white rounded-2xl p-6 shadow-2xl  w-[350px]">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <h2 className="text-basic font-bold text-gray-900">
              Переименовать{" "}
              <span className="font-medium block">{fileName}</span>
            </h2>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2"></label>
            <input
              type="text"
              className="w-full p-4 ring-1 ring-gray-400 rounded-md"
              placeholder="Новое название "
              ref={nameInputRef}
            />
          </div>

          <div className="flex space-x-3 pt-2">
            <button className="flex-1 px-6 py-3 bg-red-100 text-gray-700 rounded-xl font-medium hover:bg-red-200 pointer transition-all">
              Отмена
            </button>
            <button
              onClick={reName}
              className={`flex-1 px-6 py-3 rounded-xl hover:bg-blue-400 duration-200 cursor-pointer font-medium transition-all`}
            >
              Переименовать
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
