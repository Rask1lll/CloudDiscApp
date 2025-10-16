import { AiOutlineAudio } from "react-icons/ai";

export default function AudioFileModalWindow({
  name,
  link = "/audio.mp3",
}: {
  name: string;
  link: string;
}) {
  return (
    <div className=" rounded-xl bg-white">
      <div className="border-b border-gray-300 px-2 gap-2 flex items-center py-5">
        <AiOutlineAudio className="w-5 h-5 text-sky-400" /> {name}
      </div>
      <div className="p-2 py-5">
        <audio src={link} controls className="w-80">
          Ваш браузер не поддерживает воспроизведение аудио
        </audio>
      </div>
    </div>
  );
}
