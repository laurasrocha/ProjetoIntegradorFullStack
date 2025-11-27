"use client";
import Header from "../_components/header";
import { ProjectForm } from "@/app/docente/_components/ProjectForm";
import { SearchAndSort } from "@/app/docente/_components/SearchAndSort";
import { ProjectsGrid } from "@/app/docente/_components/ProjectsGrid";
import { ProjectDetailsModal } from "@/app/docente/_components/ProjectDetailsModal";
import { EditProjectModal } from "@/app/docente/_components/EditProjectModal";
import Link from "next/link";
import ThemeSwitch from "../_components/themeSwitch";
import { HiMiniArrowRightStartOnRectangle } from "react-icons/hi2";
import { useState, useEffect } from "react";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import ListaProjetos from "./_components/listaprojetos";

//Pegando a variaverl URL_DOMINIO
const URL_DOMINIO = process.env.NEXT_PUBLIC_URL_DOMINIO;

export default function Page() {
  const [projetos, setProjetos] = useState([]);
  const [busca, setBusca] = useState("");
  const [ordenacao, setOrdenacao] = useState("az");
  const [projetoSelecionado, setProjetoSelecionado] = useState(null);
  const [projetoEditando, setProjetoEditando] = useState(null);

  const buscarProjetos = async () => {
    try {
      const res = await axios.get(`${URL_DOMINIO}/projetos`);
      //console.log(res);
      setProjetos(res.data); // Axios retorna o JSON em res.data
    } catch (err) {
      console.error("Erro ao buscar projetos:", err);
    }
  };

  useEffect(() => {
    buscarProjetos();
  }, []);

  const atualizarProjeto = async (projetoAtualizado) => {
    try {
      // Chamada à API para atualizar
      const res = await axios.put(`${URL_DOMINIO}/projetos`, projetoAtualizado);
      toast.success(`Projeto: ${projetoAtualizado.nome_projeto} atualizado.`);

      // Atualiza o estado com o projeto modificado
      setProjetos((prev) =>
        prev.map((p) => (p.id === res.data.id ? res.data : p))
      );

      console.log("Projeto atualizado com sucesso!");
    } catch (err) {
      console.error("Erro ao atualizar projeto:", err);
      toast.error(
        `Projeto ${projetoAtualizado.nome_projeto} não foi atualizado.`
      );
    }
  };

  const projetosFiltrados = projetos
    .filter((projeto) => {
      // FILTRO (Busca)
      const termo = busca.toLowerCase();
      const nomeProjeto = projeto.nome_projeto
        ? projeto.nome_projeto.toLowerCase()
        : "";
      return nomeProjeto.includes(termo);
    })
    .slice() 
    .sort((a, b) => {
      const nomeA = a.nome_projeto ? a.nome_projeto.toLowerCase() : "";
      const nomeB = b.nome_projeto ? b.nome_projeto.toLowerCase() : "";

      if (ordenacao === "az") {
        return nomeA.localeCompare(nomeB);
      } else {
        return nomeB.localeCompare(nomeA);
      }
    });

  return (
    <div className="w-screen h-screen bg-slate-100 dark:bg-gray-900">
      <Header
        btnPjDesktop={
          <Link
            href="/projetos"
            className="w-[140px] h-[40px] hidden sm:block cursor-pointer text-[#004A8D] py-3 rounded-2xl bg-white shadow-md text-xs font-semibold uppercase transition-all duration-500 ease-in-out
           hover:tracking-wide hover:bg-[#f29100] hover:text-white hover:shadow-slate-400 focus:outline-none
           active:tracking-wide active:text-white active:shadow-none active:translate-y-2 active:duration-100
           items-center justify-center text-center"
          >
            Ver Projetos
          </Link>
        }
        btnPJMobile={
          <Link
            href="/"
            className="w-[60vw] h-[40px] mt-4 cursor-pointer text-white rounded-lg bg-[#004A8D] shadow-md text-xs font-semibold uppercase transition-all duration-500 ease-in-out
            hover:tracking-wide hover:bg-[#f29100] hover:text-white hover:shadow-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FFFFFF]
            active:tracking-wide active:bg-gray-300 active:text-white active:shadow-none active:translate-y-2 active:duration-100 flex items-center justify-center"
          >
            <HiMiniArrowRightStartOnRectangle className="w-[35px]" size={18} />
            Ver Projetos
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

      <div className="w-screen h-screen flex justify-between bg-slate-100 dark:bg-gray-900">
        <div className="flex flex-1 justify-start">
          {/* Sidebar */}
          <div className="w-full h-full sm:w-72 bg-slate-100 dark:bg-gray-900 p-4 flex flex-col gap-6">
            <h2 className="text-lg font-semibold text-center">
              Gerenciar Projetos
            </h2>

            {/* Buscar Projeto */}
            <input
              type="text"
              placeholder="Buscar projeto..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="p-2 rounded w-full border-2 border-[#004A8D]"
            />

            {/* Ordem Alfabética */}
            <select
              value={ordenacao}
              onChange={(e) => setOrdenacao(e.target.value)}
              className="border-2 border-[#004A8D] dark:bg-gray-800 p-2 rounded w-full text-sm"
            >
              <option value="az">Ordem Alfabética (A-Z)</option>
              <option value="za">Ordem Alfabética (Z-A)</option>
            </select>

            {/* Novo Projeto */}
            <ProjectForm buscarProjetos={buscarProjetos} />
          </div>
        </div>
        <div className="w-full">
          <div className="w-full h-[40px] flex justify-end p-2">
            {/* Botão DarkTheme */}
            <ThemeSwitch />
          </div>
          <div className="w-full h-auto flex flex-col items-center">
            <h1 className="text-center mt-10 text-xl font-semibold">
              Todos os projetos em andamento
            </h1>
            <ListaProjetos projetos={projetosFiltrados} />
          </div>
          {/* -------------------------- TOAST TELA - MSG QUE APARECE APOS ALGUMA AÇÃO NA TELA ---------------------------------------------------------- */}
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              // Opções globais para todos os toasts
              success: {
                duration: 3000,
                style: {
                  background: "#22c55e",
                  color: "white",
                  fontWeight: "bold",
                  padding: "16px",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  position: "relative",
                  overflow: "hidden",
                },
              },
              error: {
                duration: 3000,
                style: {
                  background: "#ef4444", // Vermelho
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  position: "relative",
                  overflow: "hidden",
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
