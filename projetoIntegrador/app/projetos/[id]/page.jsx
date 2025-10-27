// ✅ app/projetos/[id]/page.jsx (Server Component)
import formatarComCasas from "@/lib/casasdecimais";
import BtnExcluir from "./_components/BtnExcluir";
import formatarDataParaBrasileiro from "@/lib/dataBrasileira";
import Link from "next/link";

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
      <div className="w-screen min-h-screen flex justify-center items-center">
        <div className="bg-white text-black p-6 rounded w-1/2">
          <h1 className="text-2xl font-bold mb-4 bg-orange-400 p-2 rounded w-full text-center">
            Código projeto: {formatarComCasas(projeto.id, 4)}
          </h1>
          <h1 className="text-2xl font-bold mb-4">{projeto.nome_projeto}</h1>
          <p className="mb-2">
            Apresentação:{" "}
            {formatarDataParaBrasileiro(projeto.data_apresentacao)}
          </p>
          <p className="mb-2">Turma: {projeto.turma_projeto}</p>
          <p className="mb-2">Membros: {projeto.membros_projeto}</p>
          <p className="mb-2">Descrição: {projeto.descricao}</p>
          <p className="mb-2">Status: {projeto.status_projeto}</p>
          <p className="mb-2">
            Docente: {formatarComCasas(projeto.usuarioId, 3)}
          </p>

          <div className="w-full flex items-center justify-center text-md gap-x-2">
            <BtnExcluir projetoId={projeto.id} className="!w-1/3" />
            <Link
              href="/projetos"
              className="bg-green-800 hover:opacity-70 w-1/3 text-white inline-flex justify-center items-center py-2 rounded"
            >
              DashBoard
            </Link>
          </div>
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
