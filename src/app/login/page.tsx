"use client"

import { useState } from "react";
import Image from "next/image";

export default function Login() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center px-4 py-10">
      {/* Logo */}
      <div >
        <Image src="/logo.png" alt="PontoÁgil" width={200} height={200} />
      </div>

      {/* Login Form */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg max-w-md w-full p-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">Entrar</h2>
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="name@company.com"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Senha</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white rounded-lg py-3 font-semibold transition"
          >
            Entrar
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600 dark:text-gray-300">
          Não tem uma conta?{" "}
          <button
            onClick={() => setShowModal(true)}
            className="text-blue-600 hover:underline font-semibold"
          >
            Criar Conta
          </button>
        </p>
      </div>

      {/* Modal */}
      {showModal && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
            onClick={() => setShowModal(false)}
          ></div>

          {/* Modal Box */}
          <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg max-w-md w-full p-8 relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
                aria-label="Fechar modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Criar Conta</h3>
              <form className="space-y-6" action="#" method="POST">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Nome Completo</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Seu nome"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-green-600 focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-green-400 dark:focus:ring-green-400"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="name@company.com"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-green-600 focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-green-400 dark:focus:ring-green-400"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Senha</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-green-600 focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-green-400 dark:focus:ring-green-400"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg py-3 font-semibold transition"
                >
                  Cadastrar
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
