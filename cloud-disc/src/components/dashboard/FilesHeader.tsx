"use client";

import { useUserStore } from "@/store/userStore";

export default function FilesHeader() {
  const { status } = useUserStore();
  return (
    <div className="w-full not-md:hidden bg-gray-50 p-4 border-b border-gray-300 flex items-center justify-between gap-3 text-gray-700 font-semibold">
      {/* Левая часть — имя файла */}
      <div className="flex gap-2 items-center w-[50%] not-md:w-[110%] whitespace-nowrap">
        <div className="w-[5%]"></div>
        <h3 className="text-gray-900 w-[95%]">Имя</h3>
      </div>

      <div
        className={`w-[60%] ${
          !status && "ml-[3%]"
        } flex justify-between text-sm text-gray-600`}
      >
        <div className="flex not-md:hidden w-[10%] gap-2">
          <span>Тип</span>
        </div>

        <div
          className={`flex  w-[75%] ${
            status ? " lg:pr-24 md:pr-10" : "md:pr-14"
          }  not-md:hidden gap-20 `}
        >
          <span className="w-[60px] text-center">Размер</span>
          <span className=" text-center">Создано</span>
          {/* <span className="text-center">Обновлено</span> */}
        </div>
      </div>
    </div>
  );
}
