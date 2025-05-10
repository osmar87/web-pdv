"use client";

import { useState } from "react";

interface Produto {
  id: number;
  nome: string;
  preco: number;
}

const produtosFake: Produto[] = [
  { id: 1, nome: "Produto A", preco: 10 },
  { id: 2, nome: "Produto B", preco: 20 },
  { id: 3, nome: "Produto C", preco: 30 },
  { id: 4, nome: "Caneta", preco: 5 },
  { id: 5, nome: "Caderno", preco: 12 },
];

export default function NovaVenda() {
  const [carrinho, setCarrinho] = useState<Produto[]>([]);
  const [busca, setBusca] = useState("");

  const adicionarProduto = (produto: Produto) => {
    setCarrinho([...carrinho, produto]);
  };

  const total = carrinho.reduce((acc, item) => acc + item.preco, 0);

  const produtosFiltrados = produtosFake.filter((p) =>
    p.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-10  pb-5 px-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">🛒 Nova Venda</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Produtos */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Produtos</h2>

          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="🔍 Buscar produto por nome..."
            className="w-full mb-6 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="space-y-4">
            {produtosFiltrados.length > 0 ? (
              produtosFiltrados.map((produto) => (
                <div
                  key={produto.id}
                  className="bg-white border p-4 rounded-lg shadow-sm flex justify-between items-center hover:shadow-md transition"
                >
                  <div>
                    <p className="text-lg font-medium text-gray-800">
                      {produto.nome}
                    </p>
                    <p className="text-sm text-gray-500">
                      R$ {produto.preco.toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => adicionarProduto(produto)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md shadow"
                  >
                    + Adicionar
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">Nenhum produto encontrado.</p>
            )}
          </div>
        </div>

        {/* Carrinho */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Carrinho</h2>

          <div className="bg-white border p-6 rounded-lg shadow-md">
            {carrinho.length === 0 ? (
              <p className="text-gray-500 italic mb-4">
                Nenhum produto no carrinho.
              </p>
            ) : (
              <ul className="space-y-3 mb-4">
                {carrinho.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between text-gray-700 border-b pb-2"
                  >
                    <span>{item.nome}</span>
                    <span className="font-medium">
                      R$ {item.preco.toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            <div className="text-right font-bold text-lg text-gray-800">
              Total: R$ {total.toFixed(2)}
            </div>

            <button
              disabled={carrinho.length === 0}
              className="mt-6 w-full py-3 text-center font-semibold text-white rounded-md transition 
                bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Finalizar Venda
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
