// page.jsx
import Header from "@/app/_components/header";
import Link from "next/link";
import { ProjetoDetalheCard } from "./_components/card"; 


// URL de retorno (página principal da lista de projetos)
const URL_VOLTAR = "/docente"; 

// A FUNÇÃO CONTINUA ASYNC E DE SERVIDOR
export default async function ProjetoDetalhe({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  try {
    // A busca de dados é feita no servidor.
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL_DOMINIO}/projetos/${id}`,
      {
        next: { revalidate: 0 },
      }
    );

    if (!res.ok) {
      throw new Error(`Erro ao tentar pegar o projeto: Status ${res.status}`);
    }

    const projeto = await res.json();
    console.log(projeto);

    return (
      <div className="w-screen h-screen">
        <Header
          // Botão VOLTAR (Desktop)
          btnPjDesktop={
            <Link
              href={URL_VOLTAR}
              className="w-[140px] h-[40px] hidden sm:block cursor-pointer text-[#004A8D] py-3 rounded-2xl bg-white shadow-md text-xs font-semibold uppercase transition-all duration-500 ease-in-out
                       hover:tracking-wide hover:bg-[#f29100] hover:text-white hover:shadow-slate-400 focus:outline-none
                       active:tracking-wide active:text-white active:shadow-none active:translate-y-2 active:duration-100
                       items-center justify-center text-center"
            >
              Voltar
            </Link>
          }
          // Botão VOLTAR (Mobile)
          btnPJMobile={
            <Link
              href={URL_VOLTAR}
              className="w-[60vw] h-[40px] mt-4 cursor-pointer text-white rounded-lg bg-[#004A8D] shadow-md text-xs font-semibold uppercase transition-all duration-500 ease-in-out
                       hover:tracking-wide hover:bg-[#f29100] hover:text-white hover:shadow-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FFFFFF]
                       active:tracking-wide active:bg-gray-300 active:text-white active:shadow-none active:translate-y-2 active:duration-100 flex items-center justify-center"
            >
              Voltar
            </Link>
          }
          // Botão SAIR (Desktop)
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
        <ProjetoDetalheCard
          projeto={projeto}
        />
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