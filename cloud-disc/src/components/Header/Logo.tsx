import { AiOutlineFolder } from "react-icons/ai";

export default function Logo() {
  return (
    <div>
      <div className="flex items-center gap-2">
        <div className="bg-gradient-to-br from-blue-400 to-purple-400 p-2 rounded-2xl">
          <AiOutlineFolder className="w-7 h-7 text-white" />
        </div>
        <h2 className="text-xl font-bold">Диск</h2>
      </div>
    </div>
  );
}
