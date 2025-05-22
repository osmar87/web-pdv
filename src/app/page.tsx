export default function Home() {
  return (
    <main className="min-h-screen bg-white flex flex-col px-6">
      {/* Conteúdo que cresce */}
      <div className="flex-grow flex flex-col items-center justify-center">
        {/* Logo */}
        <div className="mb-8">
          <img
            src="/logo.png"
            alt="PontoÁgil"
            className="w-50 h-50"
          />
        </div>

        {/* Título */}
        <h1 className="text-4xl md:text-6xl font-bold text-blue-700 mb-4 text-center">
          PontoÁgil
        </h1>

        {/* Slogan */}
        <p className="text-lg md:text-2xl text-gray-600 mb-8 text-center">
          Venda com leveza, controle com precisão.
        </p>

        {/* Botões de ação */}
        <div className="flex gap-4">
          <a
            href="/login"
            className="bg-blue-700 text-white px-6 py-3 rounded-2xl shadow-md hover:bg-blue-800 transition"
          >
            Começar Agora
          </a>
         
        </div>
      </div>

      {/* Rodapé fixo no bottom */}
      <footer className="mt-16 text-sm text-gray-400 text-center p-10">
        © {new Date().getFullYear()} PontoÁgil. Todos os direitos reservados.
      </footer>
    </main>
  );
}
