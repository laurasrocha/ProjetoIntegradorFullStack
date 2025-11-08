"use client";
import { FiTrash2, FiEdit, FiArrowLeft } from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';

export function ProjetoDetalheCard({ projeto, onEdit }) { 
    const router = useRouter(); 
    const URL_VOLTAR = '/docente';

    const deletarProjeto = async (id) => {
        if (!window.confirm("Deseja realmente excluir este projeto?")) return;
        try {
            await axios.delete(`/api/projetos/${id}`); 
            toast.success("Projeto excluído com sucesso!");
            router.push(URL_VOLTAR); 
        } catch (error) {
            toast.error("Erro ao excluir projeto.");
            console.error("Erro ao excluir:", error);
        }
    };

    // Função auxiliar para formatar a data (se data_apresentacao existir)
    const formatarDataParaBrasileiro = (dataString) => {
        if (!dataString) return 'Não informada';
        const data = new Date(dataString);
        if (isNaN(data.getTime())) {
            return 'Data inválida';
        }
        return new Intl.DateTimeFormat('pt-BR').format(data);
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 absolute inset-0 z-40 p-4">
            <div
                key={projeto.id}
                className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 w-[50vw]"
            >
                {/* BOTÃO VOLTAR */}
                <div className="flex justify-end mb-4">
                    <button
                        onClick={() => router.push(URL_VOLTAR)}
                        className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition duration-150"
                    >
                        <FiArrowLeft className="mr-1" /> Voltar
                    </button>
                </div>
                
                {/* CONTEÚDO DO CARD */}
                <div className="border-t pt-4 border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{projeto.nome_projeto}</h2>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                        {projeto.descricao}
                    </p>

                    {/* NOVOS CAMPOS EM NEGRITO (Rótulo) */}
                    
                    {projeto.membros_projeto && (
                        <p className="text-sm text-gray-800 dark:text-gray-200 mt-2">
                            <span className="font-bold">Membros:</span> <span className="text-gray-600 dark:text-gray-300">{projeto.membros_projeto}</span>
                        </p>
                    )}
                    {projeto.turma_projeto && (
                        <p className="text-sm text-gray-800 dark:text-gray-200 mt-2">
                            <span className="font-bold">Turma:</span> <span className="text-gray-600 dark:text-gray-300">{projeto.turma_projeto}</span>
                        </p>
                    )}
                    {projeto.data_apresentacao && (
                        <p className="text-sm text-gray-800 dark:text-gray-200 mt-2">
                            <span className="font-bold">Apresentação:</span> <span className="text-gray-600 dark:text-gray-300">{formatarDataParaBrasileiro(projeto.data_apresentacao)}</span>
                        </p>
                    )}

                    <p className="text-sm text-gray-800 dark:text-gray-200 mt-2">
                        <span className="font-bold">Convidados:</span> <span className="text-gray-600 dark:text-gray-300">{projeto.convidados ? "Sim" : "Não"}</span>
                    </p>

                    {projeto.convidados && projeto.detalhesConvidados && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 pl-4">
                            <strong>Detalhes dos convidados:</strong> {projeto.detalhesConvidados}
                        </p>
                    )}

                    {projeto.observacoes && (
                        <p className="text-sm text-gray-800 dark:text-gray-200 mt-2">
                            <span className="font-bold">Observações:</span> <span className="text-gray-600 dark:text-gray-300">{projeto.observacoes}</span>
                        </p>
                    )}
                </div>

                {/* AÇÕES (Editar/Excluir) - CENTRALIZADAS */}
                <div className="flex justify-center space-x-4 mt-6 border-t pt-4 border-gray-200 dark:border-gray-700">
                    <button
                        onClick={() => onEdit(projeto.id)}
                        className="flex items-center text-yellow-600 hover:text-yellow-800 dark:text-yellow-500 dark:hover:text-yellow-400 font-medium px-4 py-2 rounded-md transition duration-200"
                    >
                        <FiEdit className="mr-2" /> Editar
                    </button>
                    <button
                        onClick={() => deletarProjeto(projeto.id)}
                        className="flex items-center text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400 font-medium px-4 py-2 rounded-md transition duration-200"
                    >
                        <FiTrash2 className="mr-2" /> Excluir
                    </button>
                </div>
            </div>
        </div>
    );
}