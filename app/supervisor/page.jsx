"use client";
import Image from "next/image";
import Header from "../_components/header";
import Link from "next/link";
import { HiMiniArrowRightStartOnRectangle } from "react-icons/hi2";
// import ProjectsGrid from "./_components/ProjectsGrid";
import ProjectForm from "./_components/ProjectForm";
import ProjectModal from "./_components/ProjectModal"; // <-- novo modal externo
import { useState, useEffect } from "react";
import ThemeSwitch from "../_components/themeSwitch";
import { toast } from "sonner";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SupervisorPage() {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  // const [feedback, setFeedback] = useState("");  // removi: agora feedback fica no modal
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

    // Normaliza ambos (filtro e dado do projeto) para evitar problemas de case
    const projectStatus = (project.status_projeto || project.status || "").toString();
    const matchesStatus =
      statusFilter === "" ||
      projectStatus.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

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
          p.id === id ? { ...p, status_projeto: status, status } : p
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
      setStatus(newStatus); //atualiza visualmente local
      await atualizarStatus(project.id, newStatus); //atualiza backend e estado global
    }

    return (
      <div className="w-[250px] p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg flex flex-col">
        <select
          value={project.status_projeto || project.status || ""} // usa sempre o valor atualizado do estado global
          onChange={handleChange}
          className={`
            w-[105px] h-[35px] border-2 border-[#004A8D] px-1 py-1 ml-auto rounded-xl
            text-black dark:text-white dark:bg-gray-800
            ${project.status_projeto === "Pendente" ? "bg-yellow-400 text-black dark:bg-yellow-400" : ""}
            ${project.status_projeto === "Aprovado" ? "bg-green-500 text-white dark:bg-green-500" : ""}
            ${project.status_projeto === "Recusado" ? "bg-red-500 text-white dark:bg-red-500" : ""}
          `}
        >
          <option className="bg-gray-700 text-white" value="">Selecione</option>
          <option className="bg-gray-700 text-white" value="Pendente">Pendente</option>
          <option className="bg-gray-700 text-white" value="Aprovado">Aprovado</option>
          <option className="bg-gray-700 text-white" value="Recusado">Recusado</option>
        </select>

        <h3 className="text-lg w-28 font-semibold text-[#004A8D] dark:text-white">
          {project.nome_projeto || project.nome}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
          Desenvolvido por: {project.membros_projeto || project.membros || project.membros_projeto}
        </p>

        <span className="mt-3 text-xs uppercase font-semibold text-gray-500 dark:text-gray-400">
          Turma: {project.turma_projeto || project.turma_projeto}
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

              {/* NOTE: opções com inicial maiúscula para combinar com o banco */}
              <select
                className="w-[300px] h-[35px] border-2 border-[#004A8D] text-black dark:text-white dark:bg-gray-900 px-2 py-1 rounded"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">Todos os Status</option>
                <option value="Pendente">Pendente</option>
                <option value="Aprovado">Aprovado</option>
                <option value="Recusado">Recusado</option>
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

        {/* removi o "Ações do Supervisor" (feedback global) porque agora o feedback é dado por projeto dentro do modal */}
      </div>

      {/* Novo modal externo (coloque ProjectModal.jsx em _components) */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}

