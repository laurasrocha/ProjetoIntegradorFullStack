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

// ✅ Componente SSR (sem "use client")
export default function ListaProjetos({ projetos }) {
  return (
    <div className="w-full h-full bg-slate-100 dark:bg-gray-900 flex flex-wrap gap-6 justify-center items-center mt-8 p-4">
      {projetos && projetos.length > 0 ? (
        projetos.map((item) => {

        
          // pegar arquivos e selecionar capa
       
          const arquivos = item.projetos || []; // anexos do banco
          const primeiroArquivo = arquivos.length > 0 ? arquivos[0] : null;

          const fotoCapa =
            primeiroArquivo && primeiroArquivo.tipo !== "pdf"
              ? primeiroArquivo.url
              : null;
          

          return (
            <Link
              key={item.id}
              href={`/projetos/${item.id}`}
              className="w-[95vw] sm:w-[400px]"
            >
              <Card className="w-[95vw] sm:w-[400px] shadow-2xl hover:tracking-wide sm:cursor-pointer flex flex-col items-center bg-slate-100 dark:bg-gray-800 transition-all duration-300 hover:scale-105 overflow-hidden">

                
                {/*  IMAGEM DE CAPA  */}
                <div className="w-full h-[200px] relative bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  {fotoCapa ? (
                    <Image
                      src={fotoCapa}
                      alt={`Imagem do projeto ${item.nome_projeto}`}
                      width={400}
                      height={200}
                      className="w-full h-full object-cover rounded"
                    />
                  ) : (
                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                      Sem imagem adicionada
                    </span>
                  )}
                </div>
            

                <CardHeader className="w-full text-center">
                  <CardTitle className="text-sm sm:text-lg">
                    {item.nome_projeto}{" "}
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Desenvolvido por: {item.membros_projeto}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          );
        })
      ) : (
        <p className="text-gray-600 dark:text-gray-300 text-center mt-10">
          Nenhum projeto encontrado.
        </p>
      )}
    </div>
  );
}
