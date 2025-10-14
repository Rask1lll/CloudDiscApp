import { BiSearch } from "react-icons/bi";

export default function Search() {
  return (
    <div className="bg-white group border gap-1 items-center max-w-[500px] w-full flex-1 h-fit p-4 flex border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm">
      <BiSearch className=" w-5 h-5 text-gray-400" />
      <input
        type="text"
        placeholder="Поиск файлов и папок..."
        className="outline-0 "
      />
    </div>
  );
}
