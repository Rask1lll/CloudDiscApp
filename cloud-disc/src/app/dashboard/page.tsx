"use client";
import FilesDashboard from "@/components/dashboard/FilesDashboard";
import MainListOptions from "@/components/listOptions/MainListOptions";
import PageNotFound from "@/components/not-found/PageNotFound";
import { useFileStore } from "@/store/fileStore";
import { useEffect } from "react";

export default function DashboardPage() {
  const { setIsPageFound, setFiles, isPageFound } = useFileStore();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const token = localStorage.getItem("access");
        if (!token) {
          setIsPageFound(false);
          return;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/storage/api/v5/me/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          console.error("Не валидный токен");
          return setIsPageFound(false);
        }

        const res = await response.json();
        if (res) setIsPageFound(true);
      } catch {
        setIsPageFound(false);
      }
    };
    async function rootFiles() {
      const token = localStorage.getItem("access");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/storage/api/v4/folders_root/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        setIsPageFound(false);
        return <PageNotFound />;
      }

      const result = await res.json();
      console.log("Ответ сервера:", result);

      const normalizedFolders = result.map((folder: any) => ({
        id: folder.id,
        name: folder.name,
        type: "folder",
        size: "—",
        createAt: new Date(folder.created_at),
        updateAt: new Date(folder.updated_at),
        parent: folder.parent || null,
        token: folder.token,
      }));

      setFiles(normalizedFolders);
    }

    checkUser();
    rootFiles();
  }, [setFiles, setIsPageFound]);

  if (!isPageFound) {
    return <PageNotFound />;
  }

  return (
    <div className="h-full">
      <MainListOptions />
      <FilesDashboard />
    </div>
  );
}
