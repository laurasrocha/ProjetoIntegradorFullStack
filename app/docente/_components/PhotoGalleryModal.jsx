//PhotoGalleryModal.jsx
"use client";

export function PhotoGalleryModal({ fotos, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col relative">
        
        {/* Botão Fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white bg-white/50 rounded-full p-1"
        >
          {/* Se não tiver lucide-react, use um X simples ou seu ícone */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <div className="p-6 border-b dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Galeria de Anexos</h3>
        </div>

        <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fotos.map((foto, index) => (
            <div key={index} className="group relative border rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
              
              {/* Verifica se é PDF ou Imagem */}
              {foto.endsWith('.pdf') ? (
                <a href={foto} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center h-full hover:bg-gray-200 transition">
                   <span className="text-red-500 font-bold text-xl">PDF</span>
                   <span className="text-sm text-gray-600 mt-2">Clique para abrir</span>
                </a>
              ) : (
                <div className="relative h-64 w-full">
                    <img 
                        src={foto} 
                        alt={`Anexo ${index + 1}`} 
                        className="w-full h-full object-contain bg-black/5"
                    />
                    {/* Botão para abrir a imagem original em nova aba */}
                    <a href={foto} target="_blank" rel="noopener noreferrer" className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-all opacity-0 group-hover:opacity-100 text-white font-semibold">
                        Abrir Imagem
                    </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

}
