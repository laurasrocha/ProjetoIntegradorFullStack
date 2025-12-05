"use client";
import { useState } from "react";
import { FiTrash2, FiEdit, FiArrowLeft, FiImage, FiFileText } from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { EditProjectModal } from "./EditProjectModal";


export function ProjetoDetalheCard({ projeto }) {
  const router = useRouter();
  const URL_VOLTAR = "/docente";

  const [isEditing, setIsEditing] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const deletarProjeto = async (id) => {
    if (!window.confirm("Deseja realmente excluir este projeto?")) return;
    try {
      await axios.delete(`/api/projetos/${id}`);
      toast.success("Projeto excluído com sucesso!");
      router.push(URL_VOLTAR);
    } catch (error) {
      toast.error("Erro ao excluir projeto.");
    }
  };

  const atualizarProjeto = async () => {
    setIsEditing(false);
    router.refresh();
  };

  const formatarDataParaBrasileiro = (dataString) => {
    if (!dataString) return "Não informada";
    const data = new Date(dataString);
    if (isNaN(data.getTime())) return "Data inválida";
    return new Intl.DateTimeFormat("pt-BR").format(data);
  };

  // Agora usando a nova tabela ProjetoArquivo
  const arquivos = projeto.projetos || [];

  // Capa = primeiro arquivo que NÃO é PDF
  const capaArquivo = arquivos.find((a) => a.tipo !== "pdf");
  const capa = capaArquivo ? capaArquivo.url : null;
  const capaEhPdf = capaArquivo?.tipo === "pdf";

  // Galeria = todos os arquivos
  const fotosGaleria = arquivos;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 absolute inset-0 z-40 p-4">
      <div
        key={projeto.id}
        className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto"
      >
        {/* Botão Voltar */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => router.push(URL_VOLTAR)}
            className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition duration-150"
          >
            <FiArrowLeft className="mr-1" /> Voltar
          </button>
        </div>

        {/* Título */}
        <div className="border-t pt-4 border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {projeto.nome_projeto}
          </h2>

          {/* Descrição */}
          <p className="text-sm text-gray-800 dark:text-gray-200 mb-4">
            <span className="font-bold">Descrição:</span>{" "}
            <span className="text-gray-600 dark:text-gray-300">{projeto.descricao}</span>
          </p>

          {/* Campos */}
          {projeto.membros_projeto && (
            <p className="text-sm text-gray-800 dark:text-gray-200 mt-2">
              <span className="font-bold">Membros:</span>{" "}
              {projeto.membros_projeto}
            </p>
          )}

          {projeto.turma_projeto && (
            <p className="text-sm text-gray-800 dark:text-gray-200 mt-2">
              <span className="font-bold">Turma:</span> {projeto.turma_projeto}
            </p>
          )}

          {projeto.data_apresentacao && (
            <p className="text-sm text-gray-800 dark:text-gray-200 mt-2">
              <span className="font-bold">Apresentação:</span>{" "}
              {formatarDataParaBrasileiro(projeto.data_apresentacao)}
            </p>
          )}

          <p className="text-sm text-gray-800 dark:text-gray-200 mt-2">
            <span className="font-bold">Convidados:</span>{" "}
            {projeto.convidados ? "Sim" : "Não"}
          </p>

          {projeto.convidados && projeto.detalhesConvidados && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 pl-4">
              <strong>Detalhes dos convidados:</strong>{" "}
              {projeto.detalhesConvidados}
            </p>
          )}

          {projeto.observacoes && (
            <p className="text-sm text-gray-800 dark:text-gray-200 mt-2">
              <span className="font-bold">Observações:</span>{" "}
              {projeto.observacoes}
            </p>
          )}

          {/* =============================== */}
          {/* NOVA ÁREA: MOSTRAR ARQUIVOS     */}
          {/* =============================== */}
          {arquivos.length > 0 && (
            <div className="mt-6">
              <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-3">
                Arquivos do Projeto:
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {arquivos.map((file) => (
                  <div
                    key={file.id}
                    className="border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 shadow-sm"
                  >
                    {file.tipo === "pdf" ? (
                      <div className="flex flex-col items-center text-center">
                        <FiFileText className="text-red-500 text-3xl mb-1" />
                        <a
                          href={file.url}
                          target="_blank"
                          className="text-sm text-blue-600 dark:text-blue-400 underline"
                        >
                          Abrir PDF
                        </a>
                      </div>
                    ) : (
                      <img
                        src={file.url}
                        alt="foto"
                        className="w-full h-28 object-cover rounded"
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Botão para galeria/modal */}
              <button
                onClick={() => setIsGalleryOpen(true)}
                className="mt-4 flex items-center gap-2 text-blue-600 dark:text-blue-400 text-sm hover:underline"
              >
                <FiImage /> Abrir Galeria Completa
              </button>
            </div>
          )}
        </div>

        {/* Botões de ação */}
        <div className="flex justify-center space-x-4 mt-6 border-t pt-4 border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center text-yellow-600 hover:text-yellow-800"
          >
            <FiEdit className="mr-2" /> Editar
          </button>
          <button
            onClick={() => deletarProjeto(projeto.id)}
            className="flex items-center text-red-600 hover:text-red-800"
          >
            <FiTrash2 className="mr-2" /> Excluir
          </button>
        </div>
      </div>

      {/* Modais */}
      {isEditing && (
        <EditProjectModal projeto={projeto} onClose={() => setIsEditing(false)} />
      )}

      {isGalleryOpen && (
        <PhotoGalleryModal arquivos={fotosGaleria} onClose={() => setIsGalleryOpen(false)} />
      )}
    </div>
  );
}
