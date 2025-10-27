export function ProjectDetailsModal({ projeto, onClose }) {
  if (!projeto) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 not-visited:rounded-xl shadow-xl p-6 max-w-md w-full border border-gray-200">
        <h2 className="text-lg font-semibold mb-3">{projeto.nome}</h2>

        <p className="text-sm mb-1"><strong>Membros:</strong> {projeto.membros_projeto || "Não informado"}</p>
        <p className="text-sm mb-1"><strong>Data de apresentação:</strong> {projeto.data_apresentacao || "Não informada"}</p>
        <p className="text-sm mb-1">
          <strong>Convidados participarão?</strong>{" "}
          {projeto.convidados ? "Sim" : "Não"}
        </p>
        {projeto.convidados && projeto.detalhesConvidados && (
        <p className="text-sm mb-1">
          <strong>Detalhes dos convidados:</strong> {projeto.detalhesConvidados}
        </p> )}
        
        <p className="text-sm mb-1"><strong>Observações:</strong> {projeto.observacoes || "Nenhuma observação"}</p>

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 dark:bg-gray-800 bg-gray-400 rounded-md hover:bg-gray-400 transition"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
