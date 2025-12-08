"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";

export default function ProjectModal({ project, onClose }) {
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);

  const base = process.env.NEXT_PUBLIC_URL_DOMINIO || "";

  // =============================
  // BUSCAR FEEDBACKS DO PROJETO
  // =============================
  async function carregarFeedbacks() {
    try {
      const res = await fetch(`${base}/projetos/${project.id}/feedback`);

      console.log("BASE:", base);
      console.log("FETCH URL:", `${base}/api/projetos/${project.id}/feedback`);


      if (!res.ok) {
        console.error("Erro ao carregar feedbacks");
        return;
      }

      const data = await res.json();
      setFeedbacks(data);
    } catch (error) {
      console.error("Erro ao buscar feedbacks:", error);
    }
  }

  // Carrega os feedbacks ao abrir o modal
  useEffect(() => {
    if (project?.id) {
      carregarFeedbacks();
    }
  }, [project]);

  // =============================
  // ENVIAR FEEDBACK
  // =============================
  async function enviarFeedbackProjeto() {
    if (!feedbackText.trim()) {
      toast.warning("Digite um feedback antes de enviar.");
      return;
    }

    try {
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

      // Atualiza a lista imediatamente
      await carregarFeedbacks();

    } catch (error) {
      console.error(error);
      toast.error("Erro de conexão.");
    }
  }

  if (!project) return null;

  // =============================
  // INTERFACE DO MODAL
  // =============================
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">

        {/* HEADER */}
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

        {/* CONTEÚDO */}
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
            <strong>Docente:</strong>
            <div>{project.usuarioId || "Não informado"}</div>
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

          {/* LISTA DE FEEDBACKS */}
          <div className="mt-8">
            <h4 className="font-semibold text-[#004A8D] dark:text-white">
              Feedbacks enviados:
            </h4>

            {feedbacks.length === 0 && (
              <p className="text-gray-500 text-sm mt-1">Nenhum feedback enviado ainda.</p>
            )}

            <div className="space-y-2 mt-2">
              {feedbacks.map((fb) => (
                <div
                  key={fb.id}
                  className="border dark:border-gray-700 p-2 rounded bg-gray-100 dark:bg-gray-700"
                >
                  <p className="text-sm">{fb.mensagem}</p>
                  <small className="text-xs text-gray-600 dark:text-gray-300">
                    {new Date(fb.criadoEm).toLocaleString()}
                  </small>
                </div>
              ))}
            </div>
          </div>

          {/* ÁREA DE ENVIO */}
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
                onClick={enviarFeedbackProjeto}
                className="px-4 py-2 rounded-2xl bg-[#004A8D] text-white cursor-pointer hover:bg-gray-500"
              >
                Enviar Feedback
              </button>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex items-center gap-3 justify-end p-4 border-t dark:border-gray-700">
          <button
            onClick={onClose}
            className="w-[120px] h-[36px] cursor-pointer text-white font-semibold rounded-2xl bg-gray-700 hover:bg-amber-500 dark:bg-white dark:hover:bg-gray-400 dark:text-[#004A8D]"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
