"use client";
import Logo from "./Logo";
import LinkGenerate from "./LinkGenerate";
import QRGenerateBtn from "./QRGenerateBtn";
import AdminBtn from "./AdminBtn";
import { useFileStore } from "@/store/fileStore";

export default function MainHeader() {
  const { isPageFound } = useFileStore();

  if (!isPageFound) {
    return <div></div>;
  }
  return (
    <header className="w-full flex h-full justify-between">
      <div className="">
        <Logo />
      </div>
      <div className="flex static gap-5">
        <QRGenerateBtn />
        <AdminBtn />
      </div>
    </header>
  );
}
