"use client";
import Image from "next/image";
import Header from "../_components/header";
import Link from "next/link";
import { HiMiniArrowRightStartOnRectangle } from "react-icons/hi2";
import ProjectsGrid from "./_components/ProjectsGrid";
import ProjectForm from "./_components/ProjectForm";
import { useState, useEffect } from "react";
import ThemeSwitch from "../_components/themeSwitch";
import { ToastProvider } from "../_components/ToastProvider";
import { toast } from "sonner";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SupervisorPage() {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [feedback, setFeedback] = useState("");
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("");

  const [selectedProject, setSelectedProject] = useState(null);

  const URL_DOMINIO = process.env.NEXT_PUBLIC_URL_DOMINIO;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        if (!URL_DOMINIO) {
          console.warn("NEXT_PUBLIC_URL_DOMINIO indefinido — tentando rota relativa /projetos");
        }
        const base = URL_DOMINIO || "";
        const res = await fetch(`${base}/projetos`);
        if (!res.ok) {
          console.warn("Resposta não OK ao buscar projetos:", res.status);
          setProjects([]);
          return;
        }
        const data = await res.json();
        if (Array.isArray(data)) setProjects(data);
        else setProjects([]);
      } catch (error) {
        console.error("Erro ao buscar projetos:", error);
        setProjects([]);
      }
    };
    fetchProjects();
  }, [URL_DOMINIO]);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      (project.nome_projeto || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (project.membros_projeto || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "" || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const enviarFeedback = () => {
    if (feedback.trim() === "") {
      toast.warning("Digite um feedback antes de enviar.");
      return;
    }
    toast.success(`Feedback enviado: ${feedback}`);
    setFeedback("");
  };

  // ============================
  //       FUNÇÃO DE PATCH
  // ============================
  async function atualizarStatus(id, status) {
    try {
      const base = URL_DOMINIO || "";
      const res = await fetch(`${base}/projetos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status_projeto: status }),
      });

      if (!res.ok) {
        toast.error("Erro ao atualizar status.");
        return;
      }

      // Atualiza estado local para manter o valor apos reload
      setProjects((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, status_projeto: status } : p
        )
      );

      toast.success("Status atualizado!");

    } catch (error) {
      console.error(error);
      toast.error("Erro de conexão");
    }
  }

  // ============================
  //   COMPONENTE PROJECT CARD
  // ============================
  function ProjectCard({ project, setSelectedProject, atualizarStatus }) {
    

    async function handleChange(e) {
      const newStatus = e.target.value;
      setStatus(newStatus); //atualiza visualmente
      await atualizarStatus(project.id, newStatus); //atualiza backend e estado global
    }

    return (
      <div className="w-[250px] p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg flex flex-col">
        <select
          value={project.status_projeto || ""} // usa sempre o valor atualizado do estado global
          onChange={handleChange}
          className={`
            w-[105px] h-[35px] border-2 border-[#004A8D] px-1 py-1 ml-auto rounded-xl
            text-black dark:text-white dark:bg-gray-800
            ${project.status_projeto === "Pendente" ? "bg-yellow-400 text-black dark:bg-amber-400" : ""}
            ${project.status_projeto === "Aprovado" ? "bg-green-500 text-white dark:bg-green-500" : ""}
            ${project.status_projeto === "Recusado" ? "bg-red-500 text-white dark:bg-red-500" : ""}
          `}
        >
          <option value="">Selecione</option>
          <option value="Pendente">Pendente</option>
          <option value="Aprovado">Aprovado</option>
          <option value="Recusado">Recusado</option>
        </select>

        <h3 className="text-lg w-28 font-semibold text-[#004A8D] dark:text-white">
          {project.nome_projeto}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
          Desenvolvido por: {project.membros_projeto}
        </p>

        <span className="mt-3 text-xs uppercase font-semibold text-gray-500 dark:text-gray-400">
          Turma: {project.turma_projeto}
        </span>

        <button
          onClick={() => setSelectedProject(project)}
          className="ml-auto mt-auto text-sm underline text-[#004A8D] hover:text-[#f29100] dark:text-white dark:hover:text-[#f29100] hover:cursor-pointer"
        >
          Ver Mais
        </button>
      </div>
    );
  }

  // ============================
  //        MODAL (SEU)
  // ============================
  function ProjectModal({ project, onClose }) {
    if (!project) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true">
        <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">

          <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
            <h3 className="text-lg font-semibold text-[#004A8D] dark:text-white">
              {project.nome_projeto}
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
              <div>{project.membros_projeto || "Não informado"}</div>
            </div>

            <div>
              <strong>Turma:</strong>
              <div>{project.turma_projeto || "Não informado"}</div>
            </div>

            <div>
              <strong>Status:</strong>
              <div>{project.status_projeto || "Não informado"}</div>
            </div>

            <div>
              <strong>Descrição:</strong>
              <div>{project.descricao || "Sem descrição cadastrada."}</div>
            </div>

            {project.imagem && (
              <div>
                <img
                  src={project.imagem}
                  alt={project.nome_projeto}
                  className="w-full h-auto rounded"
                />
              </div>
            )}
          </div>

          {/* botões dentro do ver mais */}
          <div className="flex items-center gap-3 justify-end p-4 border-t dark:border-gray-700">
            <button
              onClick={onClose}
              className="w-[160px] h-[40px] hidden sm:block cursor-pointer text-white font-semibold py-3 rounded-2xl bg-[#004A8D] shadow-md text-xs tracking-wider uppercase transition-all duration-500 ease-in-out
           hover:tracking-wide hover:bg-[#f29100] hover:text-white hover:shadow-slate-400 focus:outline-none
          active:tracking-wide active:text-white active:shadow-none active:translate-y-2 active:duration-100"
            >
              Fechar
            </button>

            <button
              onClick={() => {
                toast.success("Projeto aprovado!");
                onClose();
              }}
              className="w-[160px] h-[40px] hidden sm:block cursor-pointer text-white dark:text-[#004A8D] font-semibold py-3 rounded-2xl bg-gray-800 dark:bg-white shadow-md text-xs tracking-wider uppercase transition-all duration-500 ease-in-out
           hover:tracking-wide hover:bg-[#f29100] hover:text-white hover:shadow-slate-400 focus:outline-none
          active:tracking-wide active:text-white active:shadow-none active:translate-y-2 active:duration-100"
            >
              Feedback
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============================
  //            RETURN
  // ============================
  return (
    <div className="w-screen min-h-screen bg-slate-100 dark:bg-gray-900">
      <Header
        btnPjMobile={
          <Link href="/projetos" className="w-[60vw] h-[40px] mt-8 cursor-pointer text-white rounded-lg bg-[#004A8D] shadow-md text-xs font-semibold uppercase">
            VER PROJETOS
          </Link>
        }
        btnPjDesktop={
          <Link href="/projetos" className="w-[160px] h-[40px] hidden sm:block cursor-pointer text-[#004A8D] font-semibold py-3 rounded-2xl bg-white shadow-md text-xs tracking-wider uppercase">
            VER PROJETOS
          </Link>
        }
        btnDesktop={
          <Link href="/" className="w-[140px] h-[40px] hidden sm:block cursor-pointer text-[#004A8D] py-3 rounded-2xl bg-white shadow-md text-xs font-semibold uppercase">
            Sair
          </Link>
        }
        btnMobile={
          <Link href="/" className="w-[60vw] h-[40px] mt-4 cursor-pointer text-white rounded-lg bg-[#004A8D] shadow-md text-xs font-semibold uppercase flex items-center justify-center">
            <HiMiniArrowRightStartOnRectangle className="w-[35px]" size={18} />
            Sair
          </Link>
        }
      />

      <div className="w-full flex flex-col mt-2 space-y-6 px-1">
        {showForm && (
          <ProjectForm onProjectAdded={() => window.location.reload()} />
        )}

        <div className="w-full flex justify-between space-x-8">
          <div className="w-full p-2">
            <label className="block text-black dark:text-white mb-1 font-medium">
              Pesquisa por Filtro:
            </label>

            <div className="w-full flex flex-row space-x-3">
              <input
                type="text"
                className="w-[400px] h-[35px] border-2 text-black dark:text-white border-[#004A8D] px-2 py-1 rounded mb-2"
                placeholder="Digite um termo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <select
                className="w-[300px] h-[35px] border-2 border-[#004A8D] text-black dark:text-white dark:bg-gray-900 px-2 py-1 rounded"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">Todos os Status</option>
                <option value="aprovado">Aprovado</option>
                <option value="recusado">Recusado</option>
                <option value="pendente">Pendente</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end p-2">
            <ThemeSwitch />
          </div>
        </div>

        {/* CARDS */}
        <div className="w-full flex flex-wrap gap-6 justify-center mt-6">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                setSelectedProject={setSelectedProject}
                atualizarStatus={atualizarStatus}
              />
            ))
          ) : (
            <p className="text-gray-600 dark:text-gray-300">Nenhum projeto encontrado.</p>
          )}
        </div>

        <div className="w-full flex items-center justify-center">
          <div className="w-[90%] max-w-md mt-8 border-t border-gray-300 pt-6 space-y-4">
            <h2 className="text-lg font-semibold text-black dark:text-white text-center">
              Ações do Supervisor
            </h2>

            <div className="mt-4">
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Digite um feedback para o projeto..."
                className="w-full border-2 text-black dark:text-white border-[#004A8D] rounded p-2"
                rows={3}
              />
              <button
                onClick={enviarFeedback}
                className={`mt-8 sm:mt-2 w-[200px] h-[35px] sm:w-[450px] sm:h-[40px] cursor-pointer text-white py-2 sm:py-3 rounded-2xl bg-[#004A8D] shadow-md text-xs font-semibold uppercase transition-all duration-500 ease-in-out`}
              >
                Enviar Feedback
              </button>
            </div>
          </div>
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
