import { AiOutlineAudio } from "react-icons/ai";
import { HiOutlineVideoCamera } from "react-icons/hi";

export default function VideoFileModalWindow({
  name,
  link = "/audio.mp3",
}: {
  name: string;
  link: string;
}) {
  return (
    <div className="rounded-xl bg-white">
      <div className="border-b border-gray-300 px-2 gap-2 flex items-center py-5">
        <HiOutlineVideoCamera className="w-5 h-5 text-sky-400" /> {name}
      </div>
      <div className="p-2 py-5">
        <video
          controls
          className="rounded-lg lg:w-[600px] lg:h-[300px] sm:w-[400px] sm:h-[200px] bg-black"
        >
          <source src="https://wrong-link.mp4" type="video/mp4" />
          Ваш браузер не поддерживает видео.
        </video>
      </div>
    </div>
  );
}
