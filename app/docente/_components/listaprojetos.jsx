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
  
  const IMAGEM_PADRAO = "/carousel1.jpg"; 

  return (
    <div className="w-full h-full bg-slate-100 dark:bg-gray-900 flex flex-wrap gap-6 justify-center items-center mt-8 p-4">
      {projetos && projetos.length > 0 ? (
        projetos.map((item) => {
          
          // --- LÓGICA INTELIGENTE DA FOTO DE CAPA ---
          const listaFotos = item.fotos ? item.fotos.split(',') : [];
          const primeiroArquivo = listaFotos.length > 0 ? listaFotos[0] : null;

          let fotoCapa = IMAGEM_PADRAO; // Começa assumindo que é a padrão

          // Verifica se existe arquivo E se ele NÃO é um PDF
          if (primeiroArquivo) {
             const ehPdf = primeiroArquivo.toLowerCase().endsWith('.pdf');
             
             if (!ehPdf) {
                 // Se não for PDF, usa a foto do upload
                 fotoCapa = primeiroArquivo;
             }
             // Se for PDF, ele cai no else implícito e mantém a IMAGEM_PADRAO
          }

          return (
            <Link
              key={item.id}
              href={`/docente/${item.id}`}
              className="w-[95vw] sm:w-[400px]"
            >
              <Card className="w-[95vw] sm:w-[400px] h-full shadow-xl hover:shadow-2xl hover:tracking-wide sm:cursor-pointer flex flex-col items-center bg-slate-100 dark:bg-gray-800 transition-all duration-300 hover:scale-105 overflow-hidden">
                
                {/* Container da Imagem */}
                <div className="w-full h-[200px] relative bg-gray-200 dark:bg-gray-700">
                  <Image
                    src={fotoCapa}
                    alt={`Capa do projeto ${item.nome_projeto}`}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover rounded-t-lg" 
                    // Adiciona prioridade se for as primeiras imagens para carregar rápido
                    priority={item.id < 5} 
                  />
                  
                  {/* Se for PDF, mostra um selo indicando que tem anexo */}
                  {primeiroArquivo && primeiroArquivo.toLowerCase().endsWith('.pdf') && (
                      <div className="absolute bottom-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow">
                          PDF Anexado
                      </div>
                  )}
                </div>

                <CardHeader className="w-full text-center flex-grow">
                  <CardTitle className="text-sm sm:text-lg">
                    {item.nome_projeto}{" "}
                    <span className="text-orange-400">
                      (Código: {formatarComCasas(item.id, 4)})
                    </span>
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm line-clamp-2">
                    Desenvolvido por: {item.membros_projeto}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          );
        })
      ) : (
        <p className="text-orange-400 text-xl rounded text-center mt-10 bg-white p-2 border-2 border-orange-400">
          Nenhum projeto encontrado...
        </p>
      )}
    </div>
  );
}