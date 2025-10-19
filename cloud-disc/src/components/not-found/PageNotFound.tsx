export default function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-5xl font-bold mb-4">404 — Страница не найдена</h1>
      <p className="text-gray-500 mb-6">Кажется, ссылка не действительна</p>
      <a
        href="/"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Вернуться на главную
      </a>
    </div>
  );
}
