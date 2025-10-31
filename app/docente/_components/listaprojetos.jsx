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
  // Ordenação ou filtragem podem ser feitos no server antes de passar para props

  return (
    <div className="w-full h-full bg-slate-100 dark:bg-gray-900 flex flex-wrap gap-6 justify-center items-center mt-8 p-4">
      {projetos && projetos.length > 0 ? (
        projetos.map((item) => (
          <Link
            key={item.id}
            href={`/projetos/${item.id}`}
            className="w-[95vw] sm:w-[400px]"
          >
            <Card className="w-[95vw] sm:w-[400px] shadow-2xl hover:tracking-wide sm:cursor-pointer flex flex-col items-center bg-slate-100 dark:bg-gray-800 transition-all duration-300 hover:scale-105">
              <Image
                src="/carousel1.jpg"
                alt={`Imagem do projeto ${item.nome_projeto}`}
                width={270}
                height={100}
                className="sm:w-[390px] rounded"
              />
              <CardHeader className="w-full text-center">
                <CardTitle className="text-sm sm:text-lg">
                  {item.nome_projeto}{" "}
                  <span className="text-orange-400">
                    (Código: {formatarComCasas(item.id, 4)})
                  </span>
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Desenvolvido por: {item.membros_projeto}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))
      ) : (
        <p className="text-orange-400 text-xl rounded text-center mt-10 bg-white p-2  border-2 border-orange-400">
          Carregando aguarde...
        </p>
      )}
    </div>
  );
}
