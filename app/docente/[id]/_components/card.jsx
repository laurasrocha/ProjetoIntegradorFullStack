"use client";
import { FiEye, FiTrash2, FiEdit } from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";

export function DocenteCard({ projetos }) {
  console.log(projetos)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
  
        <div
          key={projetos.id}
          className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-4 flex flex-col justify-between"
        >
          <div>
            <h2 className="text-lg font-bold">{projetos.nome_projeto}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {projetos.descricao}
            </p>

            <p className="mt-2 text-sm font-medium">
              Convidados: {projetos.convidados ? "Sim" : "Não"}
            </p>

            {/* Mostra detalhes dos convidados se existirem */}
            {projetos.convidados && projetos.detalhesConvidados && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <strong>Detalhes dos convidados:</strong> {projetos.detalhesConvidados}
              </p>
           )}
          </div>

          <div className="flex justify-between mt-4">
            <button
        
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <FiEye className="mr-1" /> Ver mais
            </button>
            <button
       
              className="flex items-center text-yellow-600 hover:text-yellow-800"
            >
              <FiEdit className="mr-1" /> Editar
            </button>
            <button
              onClick={() => deletarProjeto(projetos.id)}
              className="flex items-center text-red-600 hover:text-red-800"
            >
              <FiTrash2 className="mr-1" /> Excluir
            </button>
          </div>
        </div>
   
    </div>
  );
}
