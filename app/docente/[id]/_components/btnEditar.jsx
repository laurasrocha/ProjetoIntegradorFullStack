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
            toast.success("Projeto atualizado!");
            router.back();
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || "Erro desconhecido ao tentar editar.";
            toast.error(errorMessage); 
        }
    };

    return (
        <Button
            onClick={handleEditar}
            // Isso daqui garante que a classe rounded e py-2 sejam aplicadas, se o Button não as tiver por padrão.
            className={`bg-blue-800 hover:opacity-70 w-1/3 text-white inline-flex justify-center items-center py-2 rounded ${className}`}
        >
            Editar Projeto
        </Button>
    );
}