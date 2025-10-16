import FilesDashboard from "@/components/dashboard/FilesDashboard";
import ListOptions from "@/components/listOptions/ListOptions";

export default function DashboardPage() {
  return (
    <div className="h-full">
      <ListOptions />
      <FilesDashboard />
    </div>
  );
}
