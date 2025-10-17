import FilesDashboard from "@/components/dashboard/FilesDashboard";
import ListOptions from "@/components/listOptions/ListOptions";
import { notFound } from "next/navigation";

export default function DashboardPage({ params }: { params: { id: string } }) {
  console.log(params.id);
  //   if (false) return notFound();
  return (
    <div className="h-full">
      <ListOptions />
      <FilesDashboard />
    </div>
  );
}
