// listaprojetos.jsx
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

// Função auxiliar para formatar ID com casas decimais
function formatarComCasas(numero, casas) {
  return numero.toString().padStart(casas, "0");
}

export default function ListaProjetos({ projetos }) {
  console.log("Projetos recebidos:", projetos);
  return (
    <div className="w-full h-full bg-slate-100 dark:bg-gray-900 flex flex-wrap gap-6 justify-center items-center sm:mt-8 p-4">
      {projetos && projetos.length > 0 ? (
        projetos.map((item) => {
          // ============================
          // NOVO: Arquivos do Supabase
          // ============================
          const arquivos = item.projetos || [];   // agora é ProjetoArquivo[]

          // Primeiro arquivo (pode ser imagem ou pdf)
          const primeiroArquivo = arquivos.length > 0 ? arquivos[0] : null;

          // Seleciona imagem de capa (se não for PDF)
          const fotoCapa =
            primeiroArquivo &&
              primeiroArquivo.tipo !== "pdf"
              ? primeiroArquivo.url
              : null;

          return (
            <Link
              key={item.id}
              href={`/docente/${item.id}`}
              className="w-[95vw] sm:w-[400px]"
            >
              <div className="w-full flex items-center justify-center">
                <Card className="w-[90vw] sm:w-[400px] h-full shadow-xl hover:shadow-2xl hover:tracking-wide sm:cursor-pointer flex flex-col items-center bg-slate-100 dark:bg-gray-800 transition-all duration-300 hover:scale-105 overflow-hidden">
                  {/* IMAGEM DE CAPA */}
                  <div className="w-full h-[200px] relative bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    {fotoCapa ? (
                      <Image
                        src={fotoCapa}
                        alt={`Capa do projeto ${item.nome_projeto}`}
                        width={400}
                        height={200}
                        className="w-full h-full object-cover rounded-t-lg"
                        priority={item.id < 5}
                      />
                    ) : (
                      <span className="text-gray-500 dark:text-gray-400 text-sm">
                        Sem imagem adicionada
                      </span>
                    )}

                    {/* SELO SE O PRIMEIRO ARQUIVO FOR PDF */}
                    {primeiroArquivo && primeiroArquivo.tipo === "pdf" && (
                      <div className="absolute bottom-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow">
                        PDF Anexado
                      </div>
                    )}
                  </div>

                  <CardHeader className="w-full text-center flex-grow">
                    <CardTitle className="text-sm sm:text-lg">
                      {item.nome_projeto}
                      {/* <span className="text-orange-400">
                        (Código: {formatarComCasas(item.id, 4)})
                      </span> */}
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm line-clamp-2">
                      Desenvolvido por: {item.membros_projeto}
                    </CardDescription>
                    <CardDescription className="text-xs sm:text-sm line-clamp-2">
                      Docente: {item.usuario?.nome_usuario || "Sem docente"}
                    </CardDescription>

                  </CardHeader>

                </Card>
              </div>
            </Link>
          );
        })
      ) : (
        <p className="text-black dark:text-white font-semibold text-sm sm:text-xl rounded text-center mt-10">
          Nenhum projeto encontrado ...
        </p>
      )}
    </div>
  );
}