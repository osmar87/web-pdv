"use client";

import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Produto {
  id: number;
  nome: string;
  preco: number;
}

interface ItemCarrinho extends Produto {
  quantidade: number;
}

const produtosFake: Produto[] = [
  { id: 1, nome: "Produto A", preco: 10 },
  { id: 2, nome: "Produto B", preco: 20 },
  { id: 3, nome: "Produto C", preco: 30 },
  { id: 4, nome: "Caneta", preco: 5 },
  { id: 5, nome: "Caderno", preco: 12 },
];

export default function PDV() {
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]);
  const [busca, setBusca] = useState("");
  const [quantidades, setQuantidades] = useState<{ [key: number]: number }>({});
  const [mostrarCarrinho, setMostrarCarrinho] = useState(false);

  // Evita rolagem da página quando o modal do carrinho está aberto
  useEffect(() => {
    if (mostrarCarrinho) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mostrarCarrinho]);

  const adicionarProduto = (produto: Produto) => {
    const quantidade = quantidades[produto.id] || 1;
    const itemExistente = carrinho.find((item) => item.id === produto.id);

    if (itemExistente) {
      setCarrinho(carrinho.map((item) =>
        item.id === produto.id
          ? { ...item, quantidade: item.quantidade + quantidade }
          : item
      ));
    } else {
      setCarrinho([...carrinho, { ...produto, quantidade }]);
    }

    setQuantidades({ ...quantidades, [produto.id]: 1 });
  };

  const removerProduto = (id: number) => {
    setCarrinho(carrinho.filter((item) => item.id !== id));
  };

  const total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

  const produtosFiltrados = produtosFake.filter((p) =>
    p.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const gerarPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Recibo de Venda", 14, 22);
    doc.setFontSize(12);
    doc.text("Empresa XYZ - Endereço da Empresa", 14, 30);
    doc.text(`Data: ${new Date().toLocaleString()}`, 14, 38);
    doc.text("Cliente: João Silva", 14, 46);
    doc.text("Endereço: Rua das Flores, 123 - Centro", 14, 54);
    doc.line(14, 60, 200, 60);

    const tableData = carrinho.map((item) => [
      item.nome,
      item.quantidade.toString(),
      `R$ ${item.preco.toFixed(2)}`,
      `R$ ${(item.preco * item.quantidade).toFixed(2)}`
    ]);

    autoTable(doc, {
      startY: 65,
      head: [["Produto", "Qtd", "Preço Unitário", "Subtotal"]],
      body: tableData
    });

    const finalY = (doc as any).lastAutoTable.finalY || 70;
    doc.text(`Total: R$ ${total.toFixed(2)}`, 14, finalY + 10);
    doc.save("recibo-venda.pdf");
  };

  const CarrinhoContent = (
    <div className="bg-white border p-6 rounded-lg shadow-md w-full max-w-md max-h-[90vh] overflow-y-auto">
      {carrinho.length === 0 ? (
        <p className="text-gray-500 italic mb-4">Nenhum produto no carrinho.</p>
      ) : (
        <ul className="space-y-3 mb-4">
          {carrinho.map((item) => (
            <li key={item.id} className="flex justify-between items-center border-b pb-2">
              <div>{item.nome} x{item.quantidade}</div>
              <div className="flex items-center gap-2">
                <span className="font-medium">R$ {(item.preco * item.quantidade).toFixed(2)}</span>
                <button
                  onClick={() => removerProduto(item.id)}
                  className="text-red-600 hover:underline"
                >
                  Remover
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="text-right font-bold text-lg text-gray-800">
        Total: R$ {total.toFixed(2)}
      </div>

      <button
        onClick={gerarPDF}
        disabled={carrinho.length === 0}
        className="mt-6 w-full py-3 text-white font-semibold bg-green-600 hover:bg-green-700 rounded-md disabled:bg-gray-300"
      >
        Finalizar Venda (PDF)
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-10 pb-10 px-6 max-w-6xl mx-auto relative">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">🛒 Nova Venda</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Seção de produtos */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Produtos</h2>

          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="🔍 Buscar produto por nome..."
            className="w-full mb-6 p-2 border border-gray-300 rounded-md shadow-sm"
          />

          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {produtosFiltrados.map((produto) => (
              <div
                key={produto.id}
                className="bg-white border p-4 rounded-lg shadow-sm flex justify-between items-center"
              >
                <div>
                  <p className="text-lg font-medium text-gray-800">{produto.nome}</p>
                  <p className="text-sm text-gray-500">R$ {produto.preco.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={1}
                    value={quantidades[produto.id] || 1}
                    onChange={(e) =>
                      setQuantidades({
                        ...quantidades,
                        [produto.id]: parseInt(e.target.value),
                      })
                    }
                    className="w-16 px-2 py-1 border border-gray-300 rounded"
                  />
                  <button
                    onClick={() => adicionarProduto(produto)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md"
                  >
                    + Adicionar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carrinho fixo para desktop */}
        <div className="hidden md:block">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Carrinho</h2>
          {CarrinhoContent}
        </div>
      </div>

      {/* Botão flutuante para mobile */}
      <button
        className="fixed bottom-4 right-4 z-40 bg-green-600 text-white px-5 py-3 rounded-full shadow-lg md:hidden"
        onClick={() => setMostrarCarrinho(true)}
      >
        Carrinho
      </button>

      {/* Modal de carrinho no mobile */}
      {mostrarCarrinho && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 md:hidden">
          <div className="relative">
            <button
              onClick={() => setMostrarCarrinho(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl font-bold z-50"
            >
              ✖
            </button>
            {CarrinhoContent}
          </div>
        </div>
      )}
    </div>
  );
}
