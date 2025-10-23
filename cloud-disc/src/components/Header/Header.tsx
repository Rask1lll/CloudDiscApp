"use client";
import Logo from "./Logo";
import LinkGenerate from "./LinkGenerate";
import QRGenerateBtn from "./QRGenerateBtn";
import AdminBtn from "./AdminBtn";
import { useFileStore } from "@/store/fileStore";
import Breadcrumbs from "@/components/uiDetails/Breadcrumbs";

export default function Header() {
  const { isPageFound } = useFileStore();

  if (!isPageFound) {
    return <div></div>;
  }
  return (
    <>
      <header className="w-full flex h-[70%] justify-between">
        <div className="">
          <Logo />
        </div>
        <div className="flex static gap-5">
          <LinkGenerate />
          <QRGenerateBtn />
          <AdminBtn />
        </div>
      </header>
      <div className="h-[30%]">
        <Breadcrumbs />
      </div>
    </>
  );
}
