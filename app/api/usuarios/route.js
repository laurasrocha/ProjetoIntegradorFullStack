// route usuários
import { NextResponse } from "next/server";
import { UsuariosService } from "./usuariosService";
//LOG NO BACK-END CASO DESEJA 

export async function GET() {
  const usuarios = await UsuariosService.getAll();
  return NextResponse.json(usuarios);
}

export async function POST(req) {

  try {
    //  Converte o corpo da requisição para JSON
    const dados = await req.json();

    console.log(" Dados recebidos do frontend:", dados);

    // Chama o model passando os dados
    const resultado = await UsuariosService.create(dados);

    //Retorna resposta JSON
    return NextResponse.json(resultado, { status: 200 });

  } catch (error) {
    console.error("Erro no POST /api/usuarios:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

}
