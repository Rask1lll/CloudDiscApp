"use client";

import { Suspense } from "react";
import VideoPlayer from "@/components/fileView/VideoPlayer";
import { useSearchParams } from "next/navigation";
import NotFound from "../not-found";
import AudioPage from "@/components/fileView/AudioPage";
import DocumentPage from "@/components/fileView/DocumentPage";
import ImagePage from "@/components/fileView/ImgPage";

function FileContent() {
  const params = useSearchParams();
  const token = params.get("link");
  const type = params.get("type");

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

export default function FilePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FileContent />
    </Suspense>
  );
}
