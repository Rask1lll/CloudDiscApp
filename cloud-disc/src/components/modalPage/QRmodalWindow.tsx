import { QRCodeSVG } from "qrcode.react";

export default function QRModalWindow() {
  const link = window.location.href;
  return (
    <div className="p-10 flex flex-col gap-4 bg-white ring-1  ring-gray-400 rounded-2xl">
      <QRCodeSVG
        value={link}
        size={200}
        fgColor="#000000"
        bgColor="#ffffff"
        level="H"
      />
    </div>
  );
}
