import { NextResponse } from "next/server";
import { ProjetoService } from "./projetosService";
//LOG NO BACK-END CASO DESEJA 
export async function GET() {
  const projetos = await ProjetoService.getAll();
  return NextResponse.json(projetos);
}

export async function POST(req) {

  try {
    //  Converte o corpo da requisição para JSON
    const dados = await req.json();

    console.log(" Dados recebidos do frontend:", dados);

    // Chama o model passando os dados
    const resultado = await ProjetoService.create(dados);

    //Retorna resposta JSON
    return NextResponse.json(resultado, { status: 200 });

  } catch (error) {
    console.error("Erro no POST /api/projetos:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

}
