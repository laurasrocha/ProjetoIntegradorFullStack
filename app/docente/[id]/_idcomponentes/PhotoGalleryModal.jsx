"use client";
import { useState } from "react";
import { FiX } from "react-icons/fi";

export default function PhotoGalleryModal({ arquivos = [], onClose }) {
  const [imagemAberta, setImagemAberta] = useState(null);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-2xl p-4 max-h-[85vh] overflow-y-auto relative">

        {/* BOTÃO FECHAR */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 dark:text-gray-300 hover:text-red-500"
        >
          <FiX size={24} />
        </button>

        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Arquivos do Projeto
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {arquivos.map((arq, index) => (
            <div
              key={index}
              className="border rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700"
            >
              {arq.tipo === "pdf" ? (
                <div className="flex flex-col items-center justify-center p-4">
                  <span className="text-red-600 font-bold mb-2">PDF</span>
                  <a
                    href={arq.url}
                    target="_blank"
                    className="text-blue-600 dark:text-blue-400 underline text-sm"
                  >
                    Abrir PDF
                  </a>
                </div>
              ) : (
                <img
                  src={arq.url}
                  alt="Foto"
                  className="w-full h-40 object-cover cursor-pointer hover:scale-105 transition"
                  onClick={() => setImagemAberta(arq.url)}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* MODAL DE IMAGEM AMPLIADA */}
      {imagemAberta && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setImagemAberta(null)}
        >
          <img
            src={imagemAberta}
            alt="Imagem ampliada"
            className="max-w-full max-h-full rounded-lg shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}
