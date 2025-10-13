import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-dvw h-dhw p-2">
      <div></div>
      <div>{children}</div>
    </div>
  );
}
