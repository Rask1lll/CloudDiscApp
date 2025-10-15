import File from "@/components/dashboard/file";
import ListOptions from "@/components/listOptions/ListOptions";

export default function DashboardPage() {
  return (
    <div className="h-full">
      <ListOptions />
      <section className=" flex flex-col bg-white h-[100%] overflow-y-auto rounded-xl">
        <File
          type="audio"
          name="example.audio"
          createDate="20-12-2001"
          size="210mb"
        ></File>
        <File
          type="video"
          name="example.mp3"
          createDate="20-12-2001"
          size="210mb"
        ></File>
        <File
          type="folder"
          name="example package"
          createDate="20-12-2001"
          size="210mb"
        ></File>
        <File
          type="file"
          name="example.txt"
          createDate="20-12-2001"
          size="210mb"
        ></File>
      </section>
    </div>
  );
}
