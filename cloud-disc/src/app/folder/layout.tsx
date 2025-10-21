import Alert from "@/components/alert/Alert";
import AuthProvider from "@/components/authorization/AuthProvider";
import Header from "@/components/Header/Header";
import ModalWindow from "@/components/modalPage/ModalWindow";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <ModalWindow />
      <div className="w-dvw h-dvh flex bg-gradient-to-br from-slate-100 to-blue-100 flex-col p-2 py-4  gap-2">
        <Alert color="red" />
        <div className=" h-[10%]">
          <Header />
        </div>
        <div className="h-[90%]">
          <AuthProvider>{children}</AuthProvider>
        </div>
      </div>
    </div>
  );
}
