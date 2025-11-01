import Header from "@/app/_components/header";
import formatarComCasas from "@/lib/casasdecimais";
import BtnExcluir from "@/app/projetos/[id]/_components/btnExcluir";
import formatarDataParaBrasileiro from "@/lib/dataBrasileira";
import Link from "next/link";
import CloseButton from "@/app/docente/[id]/_components/CloseButton";
import BtnEditar from "@/app/docente/[id]/_components/btnEditar";
import ProjectsGrid from "@/app/supervisor/_components/ProjectsGrid";
import { DocenteCard } from "./_components/card";

// A FUNÇÃO VOLTA A SER ASYNC E DE SERVIDOR
export default async function ProjetoDetalhe({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  try {
    // A busca de dados é feita diretamente aqui, no servidor.
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL_DOMINIO}/projetos/${id}`,
      {
        // Garante que os dados sejam sempre atualizados
        next: { revalidate: 0 },
      }
    );

    if (!res.ok) {
      // Se a resposta não for OK, lança um erro para ser pego pelo catch ou Boundary
      throw new Error(`Erro ao tentar pegar o projeto: Status ${res.status}`);
    }

    const projeto = await res.json();
    console.log(projeto);

    return (
      <div className="w-screen h-screen">
        <Header
          btnPjDesktop={
            <Link
              href="/docente"
              className="w-[140px] h-[40px] hidden sm:block cursor-pointer text-[#004A8D] py-3 rounded-2xl bg-white shadow-md text-xs font-semibold uppercase transition-all duration-500 ease-in-out
                    hover:tracking-wide hover:bg-[#f29100] hover:text-white hover:shadow-slate-400 focus:outline-none
                    active:tracking-wide active:text-white active:shadow-none active:translate-y-2 active:duration-100
                    items-center justify-center text-center"
            >
              Voltar
            </Link>
          }
          btnPJMobile={
            <Link
              href="/"
              className="w-[60vw] h-[40px] mt-4 cursor-pointer text-white rounded-lg bg-[#004A8D] shadow-md text-xs font-semibold uppercase transition-all duration-500 ease-in-out
                    hover:tracking-wide hover:bg-[#f29100] hover:text-white hover:shadow-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FFFFFF]
                    active:tracking-wide active:bg-gray-300 active:text-white active:shadow-none active:translate-y-2 active:duration-100 flex items-center justify-center"
            >
              Voltar
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
        />
      <DocenteCard projetos={projeto} />
      </div>
    );
  } catch (error) {
    console.error("Erro ao carregar o projeto:", error);
    return (
      <p className="text-red-500 text-center mt-10">
        Erro ao carregar o projeto.
      </p>
    );
  }
}
