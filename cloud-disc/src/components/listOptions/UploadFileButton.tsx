import { BiUpload } from "react-icons/bi";

export default function UploadFileButton() {
  return (
    <button className="bg-white p-4 py-2 h-fit rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 flex items-center space-x-3">
      <div className="w-10 p-2 bg-purple-100 rounded-lg flex items-center justify-center">
        <BiUpload className="w-5 h-5 text-purple-600" />
      </div>
      <span className="font-medium text-gray-700">Загрузить</span>
    </button>
  );
}
