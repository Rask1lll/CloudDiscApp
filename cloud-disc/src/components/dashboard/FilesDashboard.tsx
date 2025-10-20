"use client";
import { useFileStore } from "@/store/fileStore";
import FilesHeader from "./FilesHeader";
import Folder from "./Folder";
import File from "./FileCompanent";

export default function FilesDashboard() {
  const { files, searchingQuery, searchFiles } = useFileStore();

  return (
    <section className="flex flex-col h-[70%] md:h-[90%] bg-white overflow-y-auto rounded-xl">
      <FilesHeader />
      {!searchingQuery
        ? files.map((el, i) => {
            return el.type === "folder" ? (
              <Folder
                fileId={el.id}
                key={el.name + i}
                type={el.type}
                name={el.name}
                createDate={el.createAt}
                updateAt={el.updateAt}
                fileToken={el.token}
              />
            ) : (
              <File
                fileId={el.id}
                key={el.name + i}
                type={el.type}
                name={el.name}
                createDate={el.createAt}
                updateAt={el.updateAt}
                size={el.size}
                fileToken={el.token}
              ></File>
            );
          })
        : searchFiles(searchingQuery).map((el, i) => {
            return el.type === "folder" ? (
              <Folder
                fileId={el.id}
                key={el.name + i}
                type={el.type}
                name={el.name}
                createDate={el.createAt}
                updateAt={el.updateAt}
                fileToken={el.token}
              />
            ) : (
              <File
                fileId={el.id}
                key={el.name + i}
                type={el.type}
                name={el.name}
                createDate={el.createAt}
                updateAt={el.updateAt}
                size={el.size}
                fileToken={el.token}
              ></File>
            );
          })}
      {}
    </section>
  );
}
