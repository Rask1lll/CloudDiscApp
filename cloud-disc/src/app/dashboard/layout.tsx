import Alert from "@/components/alert/Alert";
import Header from "@/components/Header/Header";
import ModalWindow from "@/components/modalPage/ModalWindow";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <ModalWindow />
      <div className="w-dvw h-dvh flex bg-gradient-to-br from-slate-100 to-blue-100 flex-col p-2 py-4  gap-2">
        <Alert />
        <div className=" h-[10%]">
          <Header />
        </div>
        <div className="h-[90%]">{children}</div>
      </div>
    </div>
  );
}
