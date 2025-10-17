import { AiOutlineFile } from "react-icons/ai";

export default function FileModalWindow({
  name,
  type,
}: {
  name: string;
  type: string;
}) {
  return (
    <div className="bg-white rounded-xl  h-full">
      <div className="border-b border-gray-200">
        <h3 className="font-semibold p-2 text-xl pr-10 pt-4  text-gray-900">
          {name}
        </h3>
        <p className="text-gray-600 px-3 ">{type}</p>
      </div>
      <div className=" flex p-5 px-20 flex-col items-center justify-center h-full space-y-6">
        <AiOutlineFile className="w-24 h-24 text-gray-400" />
        <div className="text-center">
          <div className="space-y-3">
            <div className="flex space-x-3 justify-center">
              <button className="bg-gray-100 ring ring-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-blue-200 transition-colors">
                Скачать
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
