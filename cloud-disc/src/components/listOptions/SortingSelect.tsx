"use client";

import { useFileStore } from "@/store/fileStore";
import { useRef } from "react";

export default function SortingSelect() {
  const { sortFiles } = useFileStore();
  const selectRef = useRef<HTMLSelectElement | null>(null);
  function setNewSortingForFiles() {
    const value = selectRef.current?.value as
      | "alpInc"
      | "alpDec"
      | "dateInc"
      | "dateDec"
      | undefined;

    if (!value) return;
    sortFiles(value);
  }
  return (
    <select
      ref={selectRef}
      onChange={setNewSortingForFiles}
      className="ring-1 ring-gray-200 max-w-[300px] p-4 bg-white flex items-center rounded-xl shadow-sm"
    >
      <option value="alpInc">По алфавиту ({"A->Z"})</option>
      <option value="alpDec">По алфавиту ({"Z->A"})</option>
      <option value="dateDec">По дате (нов.)</option>
      <option value="dateInc">По дате (стар.)</option>
    </select>
  );
}
