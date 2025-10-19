"use client";
import { useUserStore } from "@/store/userStore";
import { useEffect, useState } from "react";
import { RiAdminFill } from "react-icons/ri";

export default function AdminBtn() {
  const { status, setStatus } = useUserStore();
  const [adminWindowOpen, setAdminWindowOpen] = useState<boolean>(false);
  const [mouseInComponent, setMouseInComponent] = useState<boolean>();

  function logOut() {
    setStatus(null);
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!mouseInComponent) {
        setAdminWindowOpen(false);
      }
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [mouseInComponent]);

  if (!status) return <></>;

  return (
    <div className="relative">
      <button
        onClick={() => {
          setAdminWindowOpen(!adminWindowOpen);
          setMouseInComponent(false);
        }}
        className="flex items-center gap-1 p-2 ring-1 rounded-xl hover:cursor-pointer hover:bg-red-50 bg-red-100 transition-colors duration-200 ring-gray-200 hover:ring-1"
      >
        <RiAdminFill className="w-5 h-5" />
      </button>
      {adminWindowOpen && (
        <div
          onMouseEnter={() => {
            setMouseInComponent(true);
          }}
          onMouseLeave={() => {
            setMouseInComponent(false);
          }}
          className="absolute right-0 p-5 ring ring-gray-300 backdrop-blur-[2px] top-[65%] rounded-2xl"
        >
          <button
            onClick={logOut}
            className={`flex-1 px-6 py-3 rounded-xl bg-red-200 hover:bg-red-400 duration-200 cursor-pointer font-medium text-sm text-nowrap transition-all`}
          >
            Выйти с админа
          </button>
        </div>
      )}
    </div>
  );
}
