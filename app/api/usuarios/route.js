// app/api/usuarios/route.js
import { NextResponse } from "next/server";
import { UsuariosService } from "./usuariosService";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const usuarios = await UsuariosService.getAll();
    return NextResponse.json(usuarios);
  } catch (error) {
    console.error("Erro no GET /api/usuarios:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const dados = await req.json();

    console.log("REQ JSON:", dados);

    if (!dados.senha_cripto) {
      return NextResponse.json(
        { error: "Senha é obrigatória" },
        { status: 400 }
      );
    }

    const senhaHash = await bcrypt.hash(dados.senha_cripto, 10);

    const resultado = await UsuariosService.create({
      nome_usuario: dados.nome_usuario,
      email_usuario: dados.email_usuario,
      senha_cripto: senhaHash,
      tipo_usuario: dados.tipo_usuario
    });

    return NextResponse.json(resultado, { status: 200 });

  } catch (error) {
    console.error("Erro no POST /api/usuarios:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

