"use client";
import { useState, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FiX, FiUploadCloud, FiTrash2 } from "react-icons/fi";

// Função auxiliar para formatar data para o input (AAAA-MM-DD)
const formatarDataParaInput = (dataString) => {
  if (!dataString) return "";
  const partes = dataString.split("/");
  if (partes.length === 3) return `${partes[2]}-${partes[1]}-${partes[0]}`;
  return dataString;
};

export function EditProjectModal({ projeto, onClose }) {
  const router = useRouter();
  const fileInputRef = useRef(null);

  // Estado para gerenciar as fotos que já existem no banco
  const [fotosExistentes, setFotosExistentes] = useState(
    projeto.fotos ? projeto.fotos.split(",") : []
  );

  // Estado do formulário
  const [formData, setFormData] = useState({
    ...projeto,
    descricao: projeto.descricao || "", // Garante que a descrição venha do projeto
    detalhesConvidados: projeto.detalhesConvidados || "",
    data_apresentacao: formatarDataParaInput(projeto.data_apresentacao),
  });

  // Estado para novos arquivos
  const [novosArquivos, setNovosArquivos] = useState([]);

  // Remove uma foto antiga da lista visual (ela será apagada do banco ao Salvar)
  const removerFotoExistente = (indexToRemove) => {
    setFotosExistentes((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  // Remove um arquivo novo que acabou de ser selecionado
  const removerNovoArquivo = (indexToRemove) => {
    setNovosArquivos((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  // Atualiza os campos de texto
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      if (name === "detalhesConvidados") {
        return { ...prev, [name]: value, convidados: value.trim() !== "" };
      }
      return { ...prev, [name]: type === "checkbox" ? checked : value };
    });
  };

  // Lida com a seleção de novos arquivos
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const totalFotos =
        fotosExistentes.length + novosArquivos.length + e.target.files.length;

      if (totalFotos > 5) {
        return toast.error("O limite total é de 5 fotos (atuais + novas).");
      }

      const selectedFiles = Array.from(e.target.files);
      setNovosArquivos((prev) => [...prev, ...selectedFiles]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Atualizando projeto...");

    try {
      const dataToSend = new FormData();

      // Adiciona campos de texto, ignorando campos de sistema
      // for (const key in formData) {
      //   if (
      //     key !== "fotos" &&
      //     key !== "id" &&
      //     key !== "usuario" &&
      //     key !== "createdAt" &&
      //     key !== "updatedAt" &&
      //     key !== "UUID"
      //   ) {
      //     dataToSend.append(key, formData[key]);
      //   }
      // }

      // Envia a lista das fotos antigas que DEVEMOS MANTER
      fotosExistentes.forEach((fotoUrl) => {
        dataToSend.append("fotosMantidas", fotoUrl);
      });

      // Envia os NOVOS arquivos
      novosArquivos.forEach((file) => {
        dataToSend.append("arquivos", file);
      });

      // Envia tudo para o PUT
      await axios.put(`/api/projetos/${projeto.id}`, dataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Projeto atualizado!", { id: toastId });

      onClose(); // Fecha o modal
      router.refresh(); // Atualiza os dados na tela sem recarregar a página inteira
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      toast.error("Erro ao atualizar projeto.", { id: toastId });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg flex flex-col max-h-[90vh]">
        {/* Header do Modal */}
        <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Editar Projeto
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 transition"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Corpo do Formulário com Scroll */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nome do Projeto */}
            <div>
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 block">
                Nome do Projeto
              </label>
              <input
                type="text"
                name="nome_projeto"
                value={formData.nome_projeto}
                onChange={handleChange}
                className="w-full border rounded-lg p-2.5 text-sm dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            {/* Descrição*/}
            <div>
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 block">
                Descrição
              </label>
              <textarea
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                className="w-full border rounded-lg p-2.5 text-sm h-24 dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Turma e Data */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 block">
                  Turma
                </label>
                <input
                  type="text"
                  name="turma_projeto"
                  value={formData.turma_projeto}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2.5 text-sm dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 block">
                  Data
                </label>
                <input
                  type="date"
                  name="data_apresentacao"
                  value={formData.data_apresentacao}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2.5 text-sm dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>

            {/* Membros */}
            <div>
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 block">
                Membros
              </label>
              <input
                type="text"
                name="membros_projeto"
                value={formData.membros_projeto}
                onChange={handleChange}
                className="w-full border rounded-lg p-2.5 text-sm dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            {/* Observações */}
            <div>
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 block">
                Observações
              </label>
              <textarea
                name="observacoes"
                value={formData.observacoes}
                onChange={handleChange}
                className="w-full border rounded-lg p-2.5 text-sm h-20 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            {/* Detalhes Convidados */}
            <div>
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 block">
                Detalhes Convidados
              </label>
              <textarea
                name="detalhesConvidados"
                value={formData.detalhesConvidados}
                onChange={handleChange}
                className="w-full border rounded-lg p-2.5 text-sm h-20 dark:bg-gray-700 dark:border-gray-600"
                placeholder="Deixe vazio se não houver convidados."
              />
            </div>

            {/* --- ÁREA DE GERENCIAR FOTOS --- */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <label className="block text-sm font-bold mb-3 text-gray-800 dark:text-white">
                Gerenciar Fotos e Arquivos
              </label>

              {/* Exibição das Fotos Atuais com Botão de Excluir */}
              {fotosExistentes.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">
                    Fotos Atuais (Clique na lixeira para remover):
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {fotosExistentes.map((foto, idx) => (
                      <div
                        key={idx}
                        className="relative group w-full h-20 rounded-md overflow-hidden border border-gray-300"
                      >
                        {foto.endsWith(".pdf") ? (
                          <div className="w-full h-full bg-red-100 flex items-center justify-center text-red-600 text-[10px] font-bold">
                            PDF
                          </div>
                        ) : (
                          <img
                            src={foto}
                            alt="Atual"
                            className="w-full h-full object-cover"
                          />
                        )}
                        {/* Botão de Excluir Foto Específica */}
                        <button
                          type="button"
                          onClick={() => removerFotoExistente(idx)}
                          className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white hover:text-red-400"
                        >
                          <FiTrash2 size={20} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Exibição dos NOVOS arquivos selecionados */}
              {novosArquivos.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs text-green-600 mb-2">
                    Novos Arquivos (Serão adicionados):
                  </p>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-2 rounded border border-green-200">
                    {novosArquivos.map((f, i) => (
                      <li
                        key={i}
                        className="flex justify-between py-1 border-b last:border-0 border-gray-200 dark:border-gray-600"
                      >
                        <span className="truncate w-3/4">{f.name}</span>
                        <button
                          type="button"
                          onClick={() => removerNovoArquivo(i)}
                          className="text-red-500 hover:underline"
                        >
                          X
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Botão de Upload */}
              <input
                type="file"
                multiple
                accept=".jpg,.jpeg,.png,.pdf"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />

              {/* Mostra botão se ainda não atingiu o limite */}
              {fotosExistentes.length + novosArquivos.length < 5 ? (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-3 px-4 bg-gray-100 dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex flex-col items-center justify-center gap-2"
                >
                  <FiUploadCloud size={24} />
                  <span>Adicionar mais fotos</span>
                  <span className="text-xs text-gray-400">
                    Restam {5 - (fotosExistentes.length + novosArquivos.length)}{" "}
                    arquivos.
                  </span>
                </button>
              ) : (
                <p className="text-center text-xs text-orange-500 font-medium p-2 border border-orange-200 bg-orange-50 rounded">
                  Limite de 5 arquivos atingido. Remova algum para adicionar
                  novos.
                </p>
              )}
            </div>
          </form>
        </div>

        {/* Footer com Botões */}
        <div className="p-5 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3 bg-gray-50 dark:bg-gray-900/50 rounded-b-xl">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium shadow-sm"
          >
            Cancelar
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-md"
          >
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  );
}
