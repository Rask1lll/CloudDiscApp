"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import FilesDashboard from "@/components/dashboard/FilesDashboard";
import ListOptions from "@/components/listOptions/ListOptions";
import PageNotFound from "@/components/not-found/PageNotFound";
import { useFileStore } from "@/store/fileStore";
import { useUserStore } from "@/store/userStore";

function DashboardContent() {
  const [pageFound, setPageFound] = useState<boolean>(true);
  const searchParams = useSearchParams();
  const uuid = searchParams.get("uuid");
  const {
    setCurrentFolderUUID,
    setIsPageFound,
    setCurrentFolderName,
    setFiles,
  } = useFileStore();

  useEffect(() => {
    if (!uuid) {
      setPageFound(false);
      setIsPageFound(false);
      return;
    }

    async function getFileFromServer() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/storage/api/v3/folders/${uuid}/`,
          { method: "GET" }
        );

        if (!res.ok) {
          setPageFound(false);
          setIsPageFound(false);
          return;
        }

        const reqResult = await res.json();
        setCurrentFolderUUID(String(reqResult.folder.id));
        setCurrentFolderName(String(reqResult.folder.name));
        setPageFound(true);

        const normalizedFolders = reqResult.subfolders.map((f: any) => ({
          id: f.id,
          type: "folder",
          name: f.name,
          size: "0",
          createAt: new Date(f.created_at),
          updateAt: new Date(f.updated_at),
          parent: f.parent || null,
          token: f.token,
        }));

        const normalizedFiles = reqResult.files.map((f: any) => ({
          id: f.id,
          type: f.file_type,
          name: f.name,
          size: f.size ?? "0",
          createAt: new Date(f.created_at),
          updateAt: new Date(f.updated_at),
          parent: f.parent,
          token: f.token,
        }));

        setFiles([...normalizedFolders, ...normalizedFiles]);
      } catch (error) {
        console.error(error);
        setPageFound(false);
        setIsPageFound(false);
      }
    }

    getFileFromServer();
  }, [uuid]);

  const { status } = useUserStore();

  const layout = status ? "h-[88%]" : "h-[93%]";

  return (
    <div className={`${layout}`}>
      {pageFound ? (
        <div className="h-full">
          <ListOptions />
          <FilesDashboard />
        </div>
      ) : (
        <PageNotFound />
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div>Загрузка страницы...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
