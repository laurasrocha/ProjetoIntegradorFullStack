// ✅ app/projetos/[id]/page.jsx (Server Component)
import formatarComCasas from "@/lib/casasdecimais";
import BtnExcluir from "./_components/btnExcluir";
import BtnEditar from "./_components/btnEditar";
import formatarDataParaBrasileiro from "@/lib/dataBrasileira";
import Link from "next/link";
import Header from "@/app/_components/header";
import ThemeSwitch from "@/app/_components/themeSwitch";


export default async function ProjetoDetalhe({ params }) {
  //pegando no FrontEnd o Parametro
  const resolvedParams = await params;
  const id = resolvedParams.id;

  try {
    // Chama a rota da API interna (funciona no servidor)
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL_DOMINIO}/projetos/${id}`,
      {
        next: { revalidate: 0 },
      }
    );

    if (!res.ok) {
      alert("Erro ao tentar pegar o projeto pelo IDs");
    }

    const projeto = await res.json();

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
          dark:bg-gray-700 dark:text-gray-100 dark:border-gray-700 dark:shadow-none dark:hover:shadow-lg"
        >
          <h1 className="text-sm font-medium text-gray-500 mb-2 tracking-wide dark:text-gray-300">
            Código do projeto
          </h1>
          <p className="text-xl font-semibold mb-6 text-gray-900 dark:text-slate-50">
            {formatarComCasas(projeto.id, 4)}
          </p>

          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">{projeto.nome_projeto}</h2>

          <div className="space-y-2 text-sm">
            <p>
              <span className="font-medium text-gray-600 dark:text-gray-300">Apresentação:</span>{" "}
              {formatarDataParaBrasileiro(projeto.data_apresentacao)}
            </p>
            <p>
              <span className="font-medium text-gray-600 dark:text-gray-300">Turma:</span>{" "}
              {projeto.turma_projeto}
            </p>
            <p>
              <span className="font-medium text-gray-600 dark:text-gray-300">Membros:</span>{" "}
              {projeto.membros_projeto}
            </p>
            <p>
              <span className="font-medium text-gray-600 dark:text-gray-300">Descrição:</span>{" "}
              {projeto.descricao}
            </p>
            <p>
              <span className="font-medium text-gray-600 dark:text-gray-300">Status:</span>{" "}
              {projeto.status_projeto}
            </p>
            <p>
              <span className="font-medium text-gray-600 dark:text-gray-300">Docente:</span>{" "}
              {formatarComCasas(projeto.usuarioId, 3)}
            </p>
            <p>
              <a href="/projetos" className="font-medium underline text-blue-600 dark:text-blue-300">Ver fotos..</a>{" "}
              
            </p>
          </div>

          {/* <div className="w-1/2 flex items-center justify-start gap-x-3 mt-6">
            <BtnExcluir projetoId={projeto.id} className=" dark:hover:bg-red-400/40 " />
            <BtnEditar projetoId={projeto.id} className="dark:hover:bg-yellow-400/40 " />
          </div> */}
        </div>
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
