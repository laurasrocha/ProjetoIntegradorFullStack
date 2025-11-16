"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";
export default function BtnEditar({ projetoId, className }) {
  const router = useRouter();
  const handleEditar = async () => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_URL_DOMINIO}/projetos/${projetoId}`
      );
      toast.success("Projeto editado!");
      // redireciona para a rota anterior
      router.back();

    } catch (err) {
      
      toast.error(err);
      toast.error("Erro ao editar projeto");
    }
  };

  return (
    <Button
      onClick={handleEditar}
      className={`bg-yellow-500 text-white hover:bg-yellow-300/50 hover:text-black w-full rounded-2xl cursor-pointer ${className}`}
    >
      Editar Projeto
    </Button>
  );
}
