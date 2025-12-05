import { useState } from "react";

export default function GaleriaAnexos({ arquivos = [], open, onClose }) {
  if (!open) return null;

  const [imgFull, setImgFull] = useState(null);
  const [imgIndex, setImgIndex] = useState(0);

  // Apenas imagens (tipo === "image")
  const imagens = (arquivos || [])
    .filter((f) => f.tipo === "image")
    .map((f) => f.url);

  const nextImage = () => {
    const next = imgIndex + 1;
    if (next < imagens.length) {
      setImgIndex(next);
      setImgFull(imagens[next]);
    }
  };

  const prevImage = () => {
    const prev = imgIndex - 1;
    if (prev >= 0) {
      setImgIndex(prev);
      setImgFull(imagens[prev]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-2xl overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Anexos do Projeto</h2>
          <button
            className="text-red-500 font-semibold hover:cursor-pointer"
            onClick={onClose}
          >
            Fechar
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {(arquivos || []).map((file, index) => {
            const isPdf = file.tipo === "pdf";

            return (
              <div key={index}>
                {!isPdf ? (
                  <div className="relative group cursor-pointer">
                    <img
                      src={file.url}
                      className="w-full h-40 object-cover rounded-xl border border-[#1E2A3F]"
                      onClick={() => {
                        const imgIdx = imagens.indexOf(file.url);
                        setImgIndex(imgIdx);
                        setImgFull(file.url);
                      }}
                    />

                    <div
                      className="
                        absolute inset-0 bg-black/50 rounded-xl opacity-0 
                        group-hover:opacity-100 flex items-center justify-center 
                        transition-opacity pointer-events-none
                      "
                    >
                      <p className="text-white text-lg font-semibold">
                        Clique para abrir
                      </p>
                    </div>
                  </div>
                ) : (
                  <div
                    className="flex flex-col items-center justify-center
                               bg-[#121B2E] border border-[#1E2A3F]
                               rounded-xl p-6 w-full h-40 cursor-pointer
                               hover:bg-[#1A2538] transition"
                    onClick={() => window.open(file.url, "_blank")}
                  >
                    <p className="text-red-500 font-bold text-lg mb-1">PDF</p>
                    <p className="text-gray-400 text-sm">Clique para abrir</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* MODAL FULLSCREEN */}
      {imgFull && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-[9999]"
          onClick={() => setImgFull(null)}
        >
          {imgIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-6 text-white text-5xl font-bold hover:cursor-pointer"
            >
              ‹
            </button>
          )}

          <img
            src={imgFull}
            className="max-w-[95%] max-h-[95%] rounded-xl shadow-xl"
          />

          {imgIndex < imagens.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-6 text-white text-5xl font-bold hover:cursor-pointer"
            >
              ›
            </button>
          )}
        </div>
      )}
    </div>
  );
}
