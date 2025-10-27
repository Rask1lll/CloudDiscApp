"use client";
import Loading from "@/components/loading/Loading";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Home() {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { setStatus } = useUserStore();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage(null);

    const email = loginRef.current?.value?.trim();
    const password = passwordRef.current?.value?.trim();

    if (!email || !password) {
      setErrorMessage("Введите email и пароль");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/storage/api/v5/login/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        const msg =
          data.detail ||
          data.message ||
          data.non_field_errors?.[0] ||
          "Ошибка входа";
        setLoading(false);
        throw new Error(msg);
      }

      localStorage.setItem("access", data.tokens.access);
      localStorage.setItem("refresh", data.tokens.refresh);

      setStatus("authenticated");
      router.push("/dashboard");
    } catch (err: any) {
      setLoading(false);
      console.error("Ошибка входа:", err);
      setErrorMessage(err.message || "Ошибка авторизации");
    }
  }

  return (
    <div className="w-dvw h-dvh flex justify-center font-semibold items-center">
      <form
        onSubmit={handleLogin}
        className="w-[50%] flex flex-col gap-5 p-6 rounded-2xl max-w-[350px] min-w-[260px] shadow-2xl bg-gray-100"
      >
        <h1 className="text-center text-2xl">Вход на платформу</h1>

        <div className="px-2 flex flex-col gap-2">
          <label htmlFor="email" className="block text-xl">
            Email
          </label>
          <input
            ref={loginRef}
            type="email"
            placeholder="user@example.com"
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
              ref={passwordRef}
              type={passwordIsVisible ? "text" : "password"}
              placeholder="securePassword123"
              id="password"
              className="outline-0 w-[90%]"
            />
            {passwordIsVisible ? (
              <FaEyeSlash
                className="h-full w-6 hover:cursor-pointer"
                onClick={() => setPasswordIsVisible(false)}
              />
            ) : (
              <FaEye
                className="h-full w-6 hover:cursor-pointer"
                onClick={() => setPasswordIsVisible(true)}
              />
            )}
          </div>
        </div>

        {errorMessage && (
          <div className="text-red-600 text-center text-sm mt-[-5px]">
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          className="p-3 px-6 flex items-center justify-center rounded-2xl ring-1 w-full ring-[#50505053] bg-[#aeecfa32] hover:bg-[#dff5fa32] hover:cursor-pointer transition-all duration-300"
        >
          {loading ? <Loading /> : <span>Войти</span>}
        </button>
      </form>
    </div>
  );
}
