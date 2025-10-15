import Image from "next/image";

export default function QRModalWindow({ link }: { link: string }) {
  console.log(link);
  return (
    <div className="p-7 bg-white ring-1 ring-gray-400 rounded-2xl">
      <Image src={"/qr.png"} alt="generated qr" width={200} height={200} />
      <button className="p-2 bg-gradient-to-l from-pink-100 to-purple-100 rounded-xl font-semibold text-gray-500">
        Скачать изображение
      </button>
    </div>
  );
}
