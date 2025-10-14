"use client";
import { useAlertStore } from "@/store/alertStore";
import { useEffect } from "react";

export default function Alert() {
  const { alert, clearAlert } = useAlertStore();

  useEffect(() => {
    setTimeout(() => {
      clearAlert();
    }, 4000);
  }, [alert]);
  return (
    <div className="absolute w-full flex top-14 justify-center">
      {alert && (
        <div className="p-2 bg-[#3cf55eb0]  font-semibold">{alert}</div>
      )}
    </div>
  );
}
