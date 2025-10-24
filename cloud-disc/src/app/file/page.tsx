"use client";

import VideoPlayer from "@/components/fileView/VideoPlayer";
import { useSearchParams } from "next/navigation";
import NotFound from "../not-found";
import AudioPage from "@/components/fileView/AudioPage";
import DocumentPage from "@/components/fileView/DocumentPage";
import ImagePage from "@/components/fileView/ImgPage";

export default function FilePage() {
  const params = useSearchParams();
  const token = params.get("link");
  const type = params.get("type");
  console.log(token);

  switch (type) {
    case "video":
      return <VideoPlayer token={String(token)} />;
    case "audio":
      return <AudioPage fileToken={String(token)} />;
    case "document":
      return <DocumentPage fileToken={String(token)} />;
    case "image":
      return <ImagePage fileToken={String(token)} />;
    default:
      return <NotFound />;
  }
}
