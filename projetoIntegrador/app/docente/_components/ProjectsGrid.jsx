"use client";
import { FiEye, FiTrash2, FiEdit } from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";

export function ProjectsGrid({ projetos, onProjectSelect, onDelete, onEdit }) {

  const deletarProjeto = async (id) => {
    try {
      await axios.delete(`http://localhost:3030/projetos/${id}`);
      toast.success(`Projeto com ID ${id} foi deletado.`);
      
      // atualizando a lista projetos apos deletar
      if (onDelete) onDelete(id);

    } catch (error) {
      if (error.response) {
        toast.error(
          `Erro: ${error.response.data.error || "Não foi possível deletar."}`
        );
      } else {
        console.error("Erro inesperado:", error.message);
        toast.error("Erro inesperado ao deletar.");
      }
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {projetos.map((projeto) => (
        <div
          key={projeto.id}
          className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-4 flex flex-col justify-between"
        >
          <div>
            <h2 className="text-lg font-bold">{projeto.nome_projeto}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {projeto.descricao}
            </p>

            <p className="mt-2 text-sm font-medium">
              Convidados: {projeto.convidados ? "Sim" : "Não"}
            </p>

            {/* Mostrar detalhes dos convidados se existirem */}
            {projeto.convidados && projeto.detalhesConvidados && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <strong>Detalhes dos convidados:</strong> {projeto.detalhesConvidados}
              </p>
           )}
          </div>

          <div className="flex justify-between mt-4">
            <button
              onClick={() => onProjectSelect(projeto)}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <FiEye className="mr-1" /> Ver mais
            </button>
            <button
              onClick={() => onEdit(projeto)}
              className="flex items-center text-yellow-600 hover:text-yellow-800"
            >
              <FiEdit className="mr-1" /> Editar
            </button>
            <button
              onClick={() => deletarProjeto(projeto.id)}
              className="flex items-center text-red-600 hover:text-red-800"
            >
              <FiTrash2 className="mr-1" /> Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
