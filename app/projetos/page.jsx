"use client";
import ListaProjetos from "./_components/listaprojetos";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
// import Image from "next/image";
// import formatarComCasas from "@/lib/casasdecimais";
// Componentes reutilizáveis

import Header from "../_components/header";
import ThemeSwitch from "../_components/themeSwitch";
import { Input } from "@/components/ui/input";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";


//Pegando a variaverl URL_DOMINIO
const URL_DOMINIO = process.env.NEXT_PUBLIC_URL_DOMINIO;

export default function Projetos() {
  // Estado para armazenar os projetos vindos do backend
  const [projetos, setProjetos] = useState([]);

  // Estado para armazenar o termo buscado no input de pesquisa
  const [searchTerm, setSearchTerm] = useState("");
  
   //filtra por nome e membros do projeto
  const filteredProjects = projetos.filter((project) => {
    const matchesSearch =
      (project.nome_projeto || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (project.membros_projeto || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    return matchesSearch
  });

  const buscarProjetos = async () => {
    try {
      const res = await axios.get(`${URL_DOMINIO}/projetos`);
      console.log(res);
      setProjetos(res.data); // axios retorna o JSON em res.data
    } catch (err) {
      console.error("Erro ao buscar projetos:", err);
    }
  };

  useEffect(() => {
    buscarProjetos();
  }, []);

  // Função para enviar logs para o backend
  const logProjetos = async (dadosProjetos) => {
    try {
      const respostaPost = await axios.post(
        `${URL_DOMINIO}/log_servidor`,
        dadosProjetos
      );
      console.log("✅ Dados enviados com sucesso:", respostaPost.data);
    } catch (erro) {
      console.log(" Erro ao enviar logs:", erro);
    }
  };

  return (
    <div className="w-screen h-screen bg-slate-100 dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
      {/* Header com botões */}
      <Header
        btnDesktop={
          <Link
            href="/login"
            className="w-[140px] h-[40px] hidden sm:block cursor-pointer text-[#004A8D] py-3 rounded-2xl bg-white shadow-md text-xs font-semibold uppercase hover:tracking-wide hover:bg-[#f29100] hover:text-white"
          >
            LOGIN
          </Link>
        }
        btnMobile={
          <Link
            href="/login"
            className="w-[60vw] h-[40px] mt-4 cursor-pointer text-white rounded-lg bg-[#004A8D] shadow-md text-xs font-semibold uppercase hover:tracking-wide hover:bg-[#f29100] hover:text-white flex items-center justify-center"
          >
            LOGIN
          </Link>
        }
        btnPjDesktop={
          <Link
            href="/"
            className="w-[160px] h-[40px] hidden sm:block cursor-pointer text-[#004A8D] font-semibold py-3 rounded-2xl bg-white shadow-md text-xs tracking-wider uppercase hover:tracking-wide hover:bg-[#f29100] hover:text-white"
          >
            Tela Inicial
          </Link>
        }
        btnPjMobile={
          <Link
            href="/"
            className="w-[60vw] h-[40px] mt-8 cursor-pointer text-white rounded-lg bg-[#004A8D] shadow-md text-xs font-semibold uppercase hover:tracking-wide hover:bg-[#f29100] hover:text-white flex items-center justify-center"
          >
            Tela Inicial
          </Link>
        }
      />

      {/* Área de pesquisa e alternância de tema */}
      <div className="w-full flex flex-col p-3">
        <div className="w-full flex justify-between items-center">
          <Input
            className="border-2 border-[#004A8D] w-[300px] sm:w-[380px] h-[40px] sm:h-[43px] text-[#004A8D] dark:text-white text-xs sm:text-lg font-semibold"
            type="text"
            placeholder="Buscar projeto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ThemeSwitch />
        </div>
        <ListaProjetos projetos={filteredProjects} />
      </div>
    </div>
  );
}

