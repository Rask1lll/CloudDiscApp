"use client";
import FilesDashboard from "@/components/dashboard/FilesDashboard";
import ListOptions from "@/components/listOptions/ListOptions";
import PageNotFound from "@/components/not-found/PageNotFound";
import { useFileStore } from "@/store/fileStore";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [pageFound, setPageFound] = useState<boolean>(true);
  const { uuid } = useParams();
  const { setCurrentFolderUUID, setIsPageFound, setFiles } = useFileStore();
  useEffect(() => {
    async function getFileFromServer() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/storage/api/v3/folders/${uuid}/`,
        {
          method: "GET",
        }
      );
      if (!res.ok) {
        setPageFound(false);
        setIsPageFound(false);
        return notFound();
      }
      const reqResult = await res.json();
      console.log(reqResult);
      setCurrentFolderUUID(String(reqResult.folder.id));
      console.log(reqResult);
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
        type: f.type,
        name: f.name,
        size: f.size ?? "0",
        createAt: new Date(f.created_at),
        updateAt: new Date(f.updated_at),
        parent: f.parent,
        token: f.token,
      }));

      setFiles([...normalizedFolders, ...normalizedFiles]);
    }
    getFileFromServer();
  }, []);
  return (
    <div className="h-full">
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
