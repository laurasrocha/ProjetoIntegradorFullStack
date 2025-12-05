"use client";

import React, { useState } from "react";
import Header from "@/app/_components/header";
import Link from "next/link";
import { FiImage } from "react-icons/fi";
import PhotoGalleryModal from "./_idcomponentes/PhotoGalleryModal";


const URL_VOLTAR = "/docente";

export default function ProjetoDetalhe({ params }) {
  const [openGalery, setOpenGalery] = useState(false);

  const resolvedParams = React.use(params);
  const id = resolvedParams.id;


  const [projeto, setProjeto] = useState(null);
  const [erro, setErro] = useState(null);

  // Buscar dados do servidor (client side)
  useState(() => {
    async function fetchProjeto() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL_DOMINIO}/projetos/${id}`,
          { cache: "no-store" }
        );

        if (!res.ok) throw new Error("Erro ao buscar projeto");

        const data = await res.json();
        setProjeto(data);
      } catch (e) {
        setErro(e.message);
      }
    }

    fetchProjeto();
  }, []);

  if (erro) {
    return (
      <p className="text-red-500 text-center mt-10">
        Ocorreu um erro ao carregar o projeto.
      </p>
    );
  }

  if (!projeto) {
    return <p className="text-center mt-10">Carregando...</p>;
  }

  const arquivos = projeto.projetos || [];

  const capaArquivo = arquivos.find((a) => a.tipo !== "pdf");
  const capa = capaArquivo ? capaArquivo.url : null;

  return (
    <div className="w-screen h-screen">
      <Header
        btnPjDesktop={
          <Link
            href={URL_VOLTAR}
            className="w-[140px] h-[40px] hidden sm:block cursor-pointer text-[#004A8D] py-3 rounded-2xl bg-white shadow-md text-xs font-semibold uppercase hover:bg-[#f29100] hover:text-white transition-all"
          >
            Voltar
          </Link>
        }
        btnPJMobile={
          <Link
            href={URL_VOLTAR}
            className="w-[60vw] h-[40px] mt-4 cursor-pointer text-white rounded-lg bg-[#004A8D] shadow-md text-xs font-semibold uppercase hover:bg-[#f29100] transition-all flex items-center justify-center"
          >
            Voltar
          </Link>
        }
        btnDesktop={
          <Link
            href="/"
            className="w-[140px] h-[40px] hidden sm:block cursor-pointer text-[#004A8D] py-3 rounded-2xl bg-white shadow-md text-xs font-semibold uppercase hover:bg-[#f29100] hover:text-white transition-all"
          >
            Sair
          </Link>
        }
      />

      {/* CARD INTEIRO AQUI DENTRO */}
      <div className="w-full flex justify-center py-6 px-4">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 w-full max-w-xl">

          {/* FOTO DE CAPA */}
          <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden flex items-center justify-center">
            {capa ? (
              <img
                src={capa}
                alt="Capa do projeto"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-500 text-sm">Sem imagem adicionada</span>
            )}
          </div>

          {/* TÍTULO */}
          <h2 className="text-xl font-bold mt-4 text-gray-900 dark:text-white">
            {projeto.nome_projeto}
          </h2>

          {/* DESCRIÇÃO */}
          <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
            {projeto.descricao}
          </p>

          {/* INFO DO PROJETO */}
          {projeto.membros_projeto && (
            <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">
              <strong>Membros:</strong> {projeto.membros_projeto}
            </p>
          )}

          {projeto.turma_projeto && (
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              <strong>Turma:</strong> {projeto.turma_projeto}
            </p>
          )}

          {projeto.observacoes && (
            <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">
              <strong>Observações:</strong> {projeto.observacoes}
            </p>
          )}

          {/* BOTÃO: VER ARQUIVOS */}
          {arquivos.length > 0 && (
            <button
              onClick={() => setOpenGalery(true)}
              className="mt-5 flex items-center text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              <FiImage className="mr-2" />
              Ver arquivos ({arquivos.length})
            </button>
          )}
        </div>
      </div>

      {/* MODAL */}
      {openGalery && (
        <PhotoGalleryModal
          arquivos={arquivos}
          onClose={() => setOpenGalery(false)}
        />
      )}
    </div>
  );
}
