"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";

export default function ProjectModal({ project, onClose }) {
  const [feedbackText, setFeedbackText] = useState("");

  async function enviarFeedbackProjeto() {
    if (!feedbackText.trim()) {
      toast.warning("Digite um feedback antes de enviar.");
      return;
    }

    try {
      const base = process.env.NEXT_PUBLIC_URL_DOMINIO || "";
      const res = await fetch(`${base}/projetos/${project.id}/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedback: feedbackText }),
      });

      if (!res.ok) {
        toast.error("Erro ao enviar feedback.");
        return;
      }

      toast.success("Feedback enviado com sucesso!");
      setFeedbackText("");
      onClose();

    } catch (error) {
      console.error(error);
      toast.error("Erro de conexão.");
    }
  }

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">

        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h3 className="text-lg font-semibold text-[#004A8D] dark:text-white">
            {project.nome_projeto || project.nome}
          </h3>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X />
          </button>
        </div>

        <div className="p-6 space-y-4 text-gray-700 dark:text-gray-300">
          <div>
            <strong>Desenvolvido por:</strong>
            <div>{project.membros_projeto || project.membros || "Não informado"}</div>
          </div>

          <div>
            <strong>Turma:</strong>
            <div>{project.turma_projeto || "Não informado"}</div>
          </div>

          <div>
            <strong>Status:</strong>
            <div>{project.status_projeto || project.status || "Não informado"}</div>
          </div>

          <div>
            <strong>Descrição:</strong>
            <div>{project.descricao || "Sem descrição cadastrada."}</div>
          </div>

          {project.imagem && (
            <div>
              <img
                src={project.imagem}
                alt={project.nome_projeto || project.nome}
                className="w-full h-auto rounded"
              />
            </div>
          )}

          {/* FEEDBACK AQUI */}
          <div className="mt-6">
            <h4 className="font-semibold text-[#004A8D] dark:text-white">
              Deixar feedback para este projeto:
            </h4>

            <textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Digite seu feedback..."
              className="w-full border-2 text-black dark:text-white border-[#004A8D] rounded p-2 mt-2"
              rows={4}
            />

            <div className="flex gap-3 justify-end mt-4">
              <button
                onClick={() => { setFeedbackText(""); }}
                className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700"
              >
                Limpar
              </button>
              <button
                onClick={enviarFeedbackProjeto}
                className="px-4 py-2 rounded-md bg-[#004A8D] text-white"
              >
                Enviar Feedback
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 justify-end p-4 border-t dark:border-gray-700">
          <button
            onClick={onClose}
            className="w-[120px] h-[36px] cursor-pointer text-white font-semibold rounded-2xl bg-gray-700 dark:bg-white dark:text-[#004A8D]"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
