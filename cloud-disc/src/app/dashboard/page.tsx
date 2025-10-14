import File from "@/components/dashboard/file";
import ListOptions from "@/components/listOptions/ListOptions";

export default function DashboardPage() {
  return (
    <div className="h-full">
      <ListOptions />
      <section className=" flex flex-col bg-white h-[100%] overflow-y-auto rounded-xl">
        <File
          type="audio"
          name="ALEm salem"
          createDate="20-12-2001"
          size="210mb"
        ></File>
        <File
          type="video"
          name="ALEm salem"
          createDate="20-12-2001"
          size="210mb"
        ></File>
        <File
          type="package"
          name="ALEm  salemsalem"
          createDate="20-12-2001"
          size="210mb"
        ></File>
        <File
          type="audio"
          name="ALEm salemsalemsalemsalemsalemsalemsalemsalemsalem"
          createDate="20-12-2001"
          size="210mb"
        ></File>
      </section>
    </div>
  );
}
