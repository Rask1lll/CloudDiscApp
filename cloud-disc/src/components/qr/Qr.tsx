"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Qr({ token }: { token: string }) {
  const [qrLink, setQrLink] = useState<string>();
  useEffect(() => {
    async function getQr() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/storage/api/v3/qr/${token}/`
        );
        setQrLink(res.url);
      } catch (e) {
        console.error(e);
      }
    }
    getQr();
  }, []);

  return (
    <div className="w-full h-full">
      {qrLink ? (
        <Image
          src={qrLink}
          alt="qr image"
          width={300}
          height={300}
          unoptimized
        />
      ) : (
        <div>Загрузка....</div>
      )}
    </div>
  );
}
