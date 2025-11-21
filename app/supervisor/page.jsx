"use client";
import Image from "next/image";
import Header from "../_components/header";
import Link from "next/link";
import { HiMiniArrowRightStartOnRectangle } from "react-icons/hi2";
import ProjectsGrid from "./_components/ProjectsGrid";
import ProjectForm from "./_components/ProjectForm";
import { useState } from "react";
import { useEffect } from "react";
import ThemeSwitch from "../_components/themeSwitch";
import { ToastProvider } from "../_components/ToastProvider";
import { toast } from "sonner";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button"



export default function SupervisorPage() {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [feedback, setFeedback] = useState("");
  const [projects, setProjects] = useState([]);
  //Pegando a variaverl URL_DOMINIO
  const URL_DOMINIO = process.env.NEXT_PUBLIC_URL_DOMINIO;
  const [actionStatus, setActionStatus] = useState({});
  const aprovarProjeto = () => toast.success("Projeto aprovado!");
  const recusarProjeto = () => toast.error("Projeto recusado!");
  const atualizarStatus = () => alert("Status atualizado!");
  const enviarFeedback = () => {
    if (feedback.trim() === "") {
      toast.warning("Digite um feedback antes de enviar.");
      return;
    }
    toast.success(`Feedback enviado: ${feedback}`);
    setFeedback("");
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${URL_DOMINIO}/projetos`);
        const data = await res.json();
        // Só mantém array válido
        if (Array.isArray(data)) setProjects(data);
        else setProjects([]);
      } catch (error) {
        console.error("Erro ao buscar projetos:", error);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.nome_projeto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.membros_projeto.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "" || project.status === statusFilter; // só se você tiver campo status

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="w-screen min-h-screen bg-slate-100 dark:bg-gray-900">
      <Header
        btnPjMobile={
          <Link
            href="/projetos"
            className="w-[60vw] h-[40px] mt-8 cursor-pointer text-white rounded-lg bg-[#004A8D] shadow-md text-xs font-semibold uppercase transition-all duration-500 ease-in-out
                        hover:tracking-wide hover:bg-[#f29100] hover:text-white hover:shadow-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FFFFFF]
                        active:tracking-wide active:bg-gray-300 active:text-white active:shadow-none active:translate-y-2 active:duration-100 flex items-center justify-center"
          >
            VER PROJETOS{" "}
          </Link>
        }
        btnPjDesktop={
          <Link
            href="/projetos"
            className="w-[160px] h-[40px] hidden sm:block cursor-pointer text-[#004A8D] font-semibold py-3 rounded-2xl bg-white shadow-md text-xs tracking-wider uppercase transition-all duration-500 ease-in-out
                     hover:tracking-wide hover:bg-[#f29100] hover:text-white hover:shadow-slate-400 focus:outline-none
                    active:tracking-wide active:text-white active:shadow-none active:translate-y-2 active:duration-100"
          >
            VER PROJETOS
          </Link>
        }
        btnDesktop={
          <Link
            href="/"
            className="w-[140px] h-[40px] hidden sm:block cursor-pointer text-[#004A8D] py-3 rounded-2xl bg-white shadow-md text-xs font-semibold uppercase transition-all duration-500 ease-in-out
              hover:tracking-wide hover:bg-[#f29100] hover:text-white hover:shadow-slate-400 focus:outline-none
              active:tracking-wide active:text-white active:shadow-none active:translate-y-2 active:duration-100
              items-center justify-center text-center"
          >
            Sair
          </Link>
        }
        btnMobile={
          <Link
            href="/"
            className="w-[60vw] h-[40px] mt-4 cursor-pointer text-white rounded-lg bg-[#004A8D] shadow-md text-xs font-semibold uppercase transition-all duration-500 ease-in-out
              hover:tracking-wide hover:bg-[#f29100] hover:text-white hover:shadow-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FFFFFF]
              active:tracking-wide active:bg-gray-300 active:text-white active:shadow-none active:translate-y-2 active:duration-100 flex items-center justify-center"
          >
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
                className="w-[300px] h-[35px] border-2 border-[#004A8D] text-black dark:text-white px-2 py-1 rounded"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option className="dark:text-black" value="">
                  Todos os Status
                </option>
                <option className="dark:text-black" value="pendente">
                  Aprovado
                </option>
                <option className="dark:text-black" value="em andamento">
                  Recusado
                </option>
                <option className="dark:text-black" value="concluído">
                  Pendente
                </option>

              </select>

            </div>
          </div>
          <div className="flex justify-end p-2">

            <ThemeSwitch />
          </div>
        </div>
        {/* cards */}
        <div className="w-full flex flex-wrap gap-6 justify-center mt-6">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <div
                key={project.id}
                className="w-[250px] p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg flex flex-col"
              >
                <select
                  className="w-[105px] h-[35px] border-2  border-[#004A8D] text-black dark:text-white px-1 py-1 ml-auto rounded"

                >
                  <option className="dark:text-black" value="">
                    Status
                  </option>
                  <option className="dark:text-black" value="pendente">
                    Aprovado
                  </option>
                  <option className="dark:text-black" value="em andamento">
                    Recusado
                  </option>
                  <option className="dark:text-black" value="concluído">
                    Pendente
                  </option>

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
                <Button variant="link" className={"ml-auto mt-auto"}>Ver Mais</Button>


              </div>



            ))
          ) : (
            <p className="text-gray-600 dark:text-gray-300">
              Nenhum projeto encontrado.
            </p>
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
                className="mt-8 sm:mt-2 w-[200px] h-[35px] sm:w-[450px] sm:h-[40px] cursor-pointer text-white py-2 sm:py-3 rounded-2xl bg-[#004A8D] shadow-md text-xs font-semibold uppercase transition-all
               duration-500 ease-in-out hover:tracking-wide hover:bg-[#f29100] hover:text-white hover:shadow-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FFFFFF]
              active:tracking-wide active:bg-gray-300 active:text-white active:shadow-none active:translate-y-2 active:duration-100 ${className}`"
              >
                Enviar Feedback
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
