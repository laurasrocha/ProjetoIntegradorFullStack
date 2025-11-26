// route usuários
import { NextResponse } from "next/server";
import { UsuariosService } from "./usuariosService";
import bcrypt from "bcrypt";


export async function GET() {
  const usuarios = await UsuariosService.getAll();
  return NextResponse.json(usuarios);
}

export async function POST(req) {

  try {
    const dados = await req.json();

    console.log("Dados recebidos do frontend:", dados);

    if (!dados.senha_cripto) {
      return NextResponse.json(
        { error: "Senha é obrigatória" },
        { status: 400 }
      );
    }

    // 🔐 Criptografar a senha ANTES de enviar para o service
    const senhaHash = await bcrypt.hash(dados.senha_cripto, 10);

    // Substituir senha normal pela criptografada
    dados.senha_cripto = senhaHash;
    delete dados.senha;

    const resultado = await UsuariosService.create(dados);

    return NextResponse.json(resultado, { status: 200 });

  } catch (error) {
    console.error("Erro no POST /api/usuarios:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
