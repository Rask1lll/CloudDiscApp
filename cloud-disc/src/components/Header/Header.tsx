"use client";
import Logo from "./Logo";
import LinkGenerate from "./LinkGenerate";
import QRGenerateBtn from "./QRGenerateBtn";
import AdminBtn from "./AdminBtn";
import { useFileStore } from "@/store/fileStore";
import Breadcrumbs from "@/components/uiDetails/Breadcrumbs";
import { useUserStore } from "@/store/userStore";

export default function Header() {
  const { isPageFound } = useFileStore();
  const { status } = useUserStore();

  if (!isPageFound) {
    return <div></div>;
  }

  const layOut = status ? "h-[12%]" : "h-[7%]";
  return (
    <>
      <header className={` ${layOut}`}>
        <div className="w-full flex justify-between">
          <div className="">
            <Logo />
          </div>
          <div className="flex static gap-5">
            <LinkGenerate />
            <QRGenerateBtn />
            <AdminBtn />
          </div>
        </div>
        <div className="mt-3">{status && <Breadcrumbs />}</div>
      </header>
    </>
  );
}
