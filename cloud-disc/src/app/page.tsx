"use client";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
export default function Home() {
  const [passwordIsVisible, setPasswordIsVisible] = useState<boolean>(false);
  return (
    <div className="w-dvw h-dvh flex justify-center font-semibold items-center">
      <form
        className="w-[50%] flex flex-col gap-5 p-6 rounded-2xl max-w-[350px] min-w-[260px] shadow-2xl bg-gray-100"
        action=""
      >
        <h1 className="text-center text-2xl">Вход на платформу</h1>

        <div className="px-2 flex flex-col gap-2">
          <label htmlFor="password" className="block text-xl">
            Логин
          </label>
          <input
            type="text"
            placeholder="Пример логина"
            id="email"
            className="outline-0 p-2 ring-1 rounded-xl w-full ring-gray-400 bg-white"
          />
        </div>
        <div className="px-2 flex flex-col gap-2">
          <label htmlFor="password" className="block text-xl">
            Пароль
          </label>
          <div className="p-2 ring-1 flex rounded-xl w-full ring-gray-400 bg-white">
            <input
              type={`${!passwordIsVisible ? "password" : "text"}`}
              placeholder="Пример пароль"
              id="email"
              className="outline-0 w-[90%]"
            />
            {!passwordIsVisible ? (
              <FaEye
                className="h-[100%] hover:cursor-pointer w-6"
                onClick={() => {
                  setPasswordIsVisible(!passwordIsVisible);
                }}
              />
            ) : (
              <FaEyeSlash
                className="h-[100%] hover:cursor-pointer w-6"
                onClick={() => {
                  setPasswordIsVisible(!passwordIsVisible);
                }}
              />
            )}
          </div>
        </div>
        <button className="p-3 px-6 rounded-2xl ring-1 ring-[#50505053] bg-[#aeecfa32] hover:bg-[#dff5fa32] hover:cursor-pointer transition-all duration-300">
          Вход
        </button>
      </form>
    </div>
  );
}
