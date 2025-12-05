"use client";

import React, { useState, useEffect } from "react";
import Header from "@/app/_components/header";
import Link from "next/link";
import { FiImage, FiTrash2, FiEdit } from "react-icons/fi";
import PhotoGalleryModal from "./_idcomponentes/PhotoGalleryModal";
import axios from "axios";
import toast from "react-hot-toast";
import { EditProjectModal } from "../_components/EditProjectModal";
import { useRouter } from "next/navigation";

const URL_VOLTAR = "/docente";

export default function ProjetoDetalhe({ params }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [openGalery, setOpenGalery] = useState(false);

  const resolvedParams = React.use(params);
  const id = resolvedParams.id;

  const [projeto, setProjeto] = useState(null);
  const [erro, setErro] = useState(null);

  // BUSCAR PROJETO
  useEffect(() => {
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
  }, [id]);

  const deletarProjeto = async (id) => {
    if (!window.confirm("Deseja realmente excluir este projeto?")) return;

    try {
      await axios.delete(`/api/projetos/${id}`);
      toast.success("Projeto excluído!");
      router.push("/docente");
    } catch (error) {
      toast.error("Erro ao excluir.");
    }
  };

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

      {/* CARD COMPLETO */}
      <div className="w-full flex justify-center py-6 px-4">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 w-full max-w-xl">

          {/* FOTO DE CAPA */}
          <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden flex items-center justify-center">
            {capa ? (
              <img src={capa} alt="Capa do projeto" className="w-full h-full object-cover" />
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

          {/* CAMPOS */}
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

          {projeto.usuario && (
            <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">
              <strong>Docente:</strong> {projeto.usuario.nome_usuario}
            </p>
          )}

          {/* BOTÃO VER ARQUIVOS */}
          {arquivos.length > 0 && (
            <button
              onClick={() => setOpenGalery(true)}
              className="mt-5 flex items-center text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              <FiImage className="mr-2" />
              Ver arquivos ({arquivos.length})
            </button>
          )}

          {/* BOTÕES EDITAR / EXCLUIR */}
          <div className="flex justify-center space-x-4 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center text-yellow-600 hover:text-yellow-800 dark:text-yellow-500 dark:hover:text-yellow-400 font-medium px-4 py-2 rounded-md transition duration-200"
            >
              <FiEdit className="mr-2" /> Editar
            </button>

            <button
              onClick={() => deletarProjeto(projeto.id)}
              className="flex items-center text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400 font-medium px-4 py-2 rounded-md transition duration-200"
            >
              <FiTrash2 className="mr-2" /> Excluir
            </button>
          </div>

          {/* MODAL EDITAR */}
          {isEditing && (
            <EditProjectModal projeto={projeto} onClose={() => setIsEditing(false)} />
          )}
        </div>
      </div>

      {/* MODAL GALERIA */}
      {openGalery && (
        <PhotoGalleryModal
          arquivos={arquivos}
          onClose={() => setOpenGalery(false)}
        />
      )}
    </div>
  );
}
