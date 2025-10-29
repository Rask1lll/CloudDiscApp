import { QRCodeSVG } from "qrcode.react";
import { useRef } from "react";

export default function MakeQr({ link }: { link: string }) {
  const qrRef = useRef<SVGSVGElement | null>(null);

  const handleDownload = () => {
    if (!qrRef.current) return;

    const svg = qrRef.current;
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    const canvas = document.createElement("canvas");
    const scale = 4;

    img.onload = () => {
      canvas.width = svg.clientWidth * scale;
      canvas.height = svg.clientHeight * scale;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.scale(scale, scale);
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);

      const pngUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = pngUrl;
      a.download = "qr-code.png";
      a.click();
    };

    img.src = url;
  };

  return (
    <div className="p-10 flex flex-col items-center gap-4 bg-white ring-1 ring-gray-400 rounded-2xl">
      <QRCodeSVG
        ref={qrRef}
        value={link}
        size={300}
        fgColor="#000000"
        bgColor="#ffffff"
        level="M"
        includeMargin={true}
      />
      <button
        onClick={handleDownload}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Скачать PNG
      </button>
    </div>
  );
}
