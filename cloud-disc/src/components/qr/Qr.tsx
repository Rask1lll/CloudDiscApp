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
        console.log(res.url);
        setQrLink(res.url);
      } catch (e) {
        console.error(e);
      }
    }
    getQr();
    console.log("start");
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
