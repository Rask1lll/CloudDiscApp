"use client";
import Logo from "./Logo";
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
        <AdminBtn />
      </div>
    </header>
  );
}
