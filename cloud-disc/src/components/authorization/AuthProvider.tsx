"use client";
import { useEffect } from "react";
import { useUserStore } from "@/store/userStore";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setStatus } = useUserStore();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const token = localStorage.getItem("access");
        if (!token) return setStatus(null);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/storage/api/v5/me/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          console.error("Не валидный токен");
          return setStatus(null);
        }

        const res = await response.json();
        if (res) setStatus("Authorized");
      } catch {
        setStatus(null);
      }
    };

    checkUser();
  }, []);

  return <>{children}</>;
}
