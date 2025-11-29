"use client";

import { useState } from "react";
import Link from "next/link";
import GaleriaAnexos from "./galeriaAnexos";
import Header from "@/app/_components/header";
import ThemeSwitch from "@/app/_components/themeSwitch";
import formatarComCasas from "@/lib/casasdecimais";
import formatarDataParaBrasileiro from "@/lib/dataBrasileira";

export default function DetalhesProjeto({ projeto }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-screen gap-5 flex flex-col justify-center items-center">
      <Header
        btnPjDesktop={
          <Link
            href="/projetos"
            className="w-[160px] h-[40px] hidden sm:block cursor-pointer text-[#004A8D] font-semibold py-3 rounded-2xl bg-white shadow-md text-xs tracking-wider uppercase hover:tracking-wide hover:bg-[#f29100] hover:text-white"
          >
            Voltar
          </Link>
        }
      />

      <div className="w-full flex justify-end items-center">
        <ThemeSwitch />
      </div>

      <div
        className="projeto-card-minimal bg-white text-gray-800 border border-gray-200 p-6 rounded-xl w-full max-w-2xl shadow-sm hover:shadow-md transition-shadow
          dark:bg-gray-700 dark:text-gray-100 dark:border-gray-700"
      >
        <h1 className="text-sm font-medium text-gray-500 mb-2">
          Código do projeto
        </h1>

        <p className="text-xl font-semibold mb-6">
          {formatarComCasas(projeto.id, 4)}
        </p>

        <h2 className="text-2xl font-bold mb-4">
          {projeto.nome_projeto}
        </h2>

        <div className="space-y-2 text-sm">
          <p>
            <span className="font-medium">Apresentação:</span>{" "}
            {formatarDataParaBrasileiro(projeto.data_apresentacao)}
          </p>

          <p>
            <span className="font-medium">Turma:</span>{" "}
            {projeto.turma_projeto}
          </p>

          <p>
            <span className="font-medium">Membros:</span>{" "}
            {projeto.membros_projeto}
          </p>

          <p>
            <span className="font-medium">Descrição:</span>{" "}
            {projeto.descricao}
          </p>

          <p>
            <span className="font-medium">Status:</span>{" "}
            {projeto.status_projeto}
          </p>

          <p>
            <span className="font-medium">Docente:</span>{" "}
            {formatarComCasas(projeto.usuarioId, 3)} - {projeto.usuario?.nome_usuario}
          </p>

          <button
            onClick={() => setOpen(true)}
            className="font-medium underline text-blue-600 hover:text-amber-600 dark:text-blue-300 dark:hover:text-amber-500 hover:cursor-pointer"
          >
            Ver anexos
          </button>
        </div>
      </div>

      <GaleriaAnexos
        // projetoId={projeto.id}
        fotos={projeto.fotos}
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
