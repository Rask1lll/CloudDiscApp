"use client";
import { useFileStore } from "@/store/fileStore";
import File from "./File";
import { nanoid } from "nanoid";
import { useEffect } from "react";

export const testFiles = [
  {
    id: nanoid(),
    type: "audio",
    name: "podcast_episode_01.mp3",
    size: "18.4 MB",
    createAt: "2023-05-12",
    updateAt: "2023-05-12",
    parent: "root",
  },
  {
    id: nanoid(),
    type: "image",
    name: "team_photo.jpg",
    size: "2.3 MB",
    createAt: "2024-01-08",
    updateAt: "2024-01-08",
    parent: "root",
  },
  {
    id: nanoid(),
    type: "video",
    name: "project_demo.mp4",
    size: "450 MB",
    createAt: "2024-11-21",
    updateAt: "2024-11-21",
    parent: "root",
  },
  {
    id: nanoid(),
    type: "folder",
    name: "Marketing Materials",
    size: "3.8 GB",
    createAt: "2023-12-30",
    updateAt: "2023-12-30",
    parent: "root",
  },
  {
    id: nanoid(),
    type: "file",
    name: "report_summary.txt",
    size: "48 KB",
    createAt: "2025-02-04",
    updateAt: "2025-02-04",
    parent: "root",
  },
  {
    id: nanoid(),
    type: "excel",
    name: "financial_data.xlsx",
    size: "5.2 MB",
    createAt: "2024-09-15",
    updateAt: "2024-09-15",
    parent: "root",
  },
  {
    id: nanoid(),
    type: "pdf",
    name: "project_documentation.pdf",
    size: "12.7 MB",
    createAt: "2023-10-05",
    updateAt: "2023-10-05",
    parent: "root",
  },
  {
    id: nanoid(),
    type: "image",
    name: "design_mockup.png",
    size: "4.5 MB",
    createAt: "2024-06-19",
    updateAt: "2024-06-19",
    parent: "root",
  },
  {
    id: nanoid(),
    type: "video",
    name: "team_meeting_recording.mp4",
    size: "690 MB",
    createAt: "2024-03-10",
    updateAt: "2024-03-10",
    parent: "root",
  },
  {
    id: nanoid(),
    type: "folder",
    name: "Archived Reports",
    size: "1.2 GB",
    createAt: "2022-11-01",
    updateAt: "2022-11-01",
    parent: "root",
  },
  {
    id: nanoid(),
    type: "file",
    name: "notes_from_meeting.docx",
    size: "320 KB",
    createAt: "2025-01-22",
    updateAt: "2025-01-22",
    parent: "root",
  },
  {
    id: nanoid(),
    type: "audio",
    name: "voice_memo_14.m4a",
    size: "9.3 MB",
    createAt: "2024-08-05",
    updateAt: "2024-08-05",
    parent: "root",
  },
  {
    id: nanoid(),
    type: "excel",
    name: "inventory_list.xlsx",
    size: "2.1 MB",
    createAt: "2023-07-28",
    updateAt: "2023-07-28",
    parent: "root",
  },
  {
    id: nanoid(),
    type: "image",
    name: "product_preview.webp",
    size: "1.8 MB",
    createAt: "2025-03-02",
    updateAt: "2025-03-02",
    parent: "root",
  },
  {
    id: nanoid(),
    type: "video",
    name: "promo_clip.mov",
    size: "230 MB",
    createAt: "2023-09-17",
    updateAt: "2023-09-17",
    parent: "root",
  },
];
export default function FilesDashboard() {
  const { files, setFiles } = useFileStore();
  useEffect(() => {
    setFiles(testFiles);
  }, []);
  return (
    <section className=" flex flex-col h-[90%] bg-white overflow-y-auto rounded-xl">
      {files.map((el, i) => {
        return (
          <File
            key={el.name + i}
            type={el.type}
            name={el.name}
            createDate={el.createAt}
            updateAt={el.updateAt}
            size={el.size}
          ></File>
        );
      })}
    </section>
  );
}
