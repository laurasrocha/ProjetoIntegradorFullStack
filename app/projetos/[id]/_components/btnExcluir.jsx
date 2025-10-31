"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";
export default function BtnExcluir({ projetoId, className }) {
  const router = useRouter();
  const handleExcluir = async () => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_URL_DOMINIO}/projetos/${projetoId}`
      );
      toast.success("Projeto excluído!");
      // redireciona para a rota anterior
      router.back();

    } catch (err) {
      
      toast.error(err);
      toast.error("Erro ao excluir projeto");
    }
  };

  return (
    <Button
      onClick={handleExcluir}
      className={`bg-red-800 text-white hover:opacity-70 w-full ${className}`}
    >
      Excluir Projeto
    </Button>
  );
}
