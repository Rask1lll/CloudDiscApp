"use client";
import { Component, useRef, useState } from "react";
import { BiFolder } from "react-icons/bi";
import { FaFolderPlus } from "react-icons/fa";
import { HiDocumentAdd, HiFolderAdd } from "react-icons/hi";
import { MdOutlineAddBox } from "react-icons/md";

export default function AddFileBtn() {
  const iconRef = useRef(null);
  const [opened, setOpened] = useState<boolean>(false);

  function rotateIcon() {
    if (iconRef.current) {
      iconRef.current.classList.toggle("rotate-90");
    }
  }
  return (
    <div className={`relative `}>
      <div
        className={`bg-white${
          opened &&
          " rounded-t-xl max-w-[200px] flex flex-col box-border border-t-0 border-[1px] border-b-0"
        }`}
      >
        <button
          onClick={() => {
            setOpened(!opened);
            rotateIcon();
          }}
          className="flex items-center gap-1 p-2 px-4 ring-1 w-full rounded-xl hover:cursor-pointer ring-gray-400 bg-[#a4a4a40b]"
        >
          Добавить{" "}
          <div ref={iconRef} className="transition-transform duration-700">
            <MdOutlineAddBox className="w-5 h-5" />
          </div>
        </button>
        <div className="h-2"></div>
        {opened && (
          <div className="top-[100%] left-0 absolute flex bg-white flex-col w-full gap-2 rounded-b-2xl border-[1px] border-t-0 ">
            <button className="flex items-center gap-1 p-2 px-4 ring-1 justify-between rounded-xl hover:cursor-pointer ring-gray-400 bg-white">
              Папка <HiFolderAdd className="w-5 h-5" />
            </button>
            <label htmlFor="inputFile">
              <div className="flex items-center gap-1 p-2 px-3 w-full ring-1 justify-between rounded-xl hover:cursor-pointer ring-gray-400 bg-white">
                Документ <HiDocumentAdd className="w-5 h-5" />
              </div>
            </label>
            <input
              type="file"
              className="hidden"
              id="inputFile"
              name="inputFile"
            />
          </div>
        )}
      </div>
    </div>
  );
}
