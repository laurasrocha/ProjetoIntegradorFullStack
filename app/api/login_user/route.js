//api/login_user/route.js
// Este arquivo bloqueia qualquer tentativa de login com dados falsos ou errados.

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { user, senha } = await req.json();

    // 1. Verificar se o user existe
    const usuario = await prisma.usuarios.findUnique({
      where: { email_usuario: user },
    });

    if (!usuario) {
      return NextResponse.json(
        { error: "Usuário não encontrado." },
        { status: 400 }
      );
    }

    // 2. Comparar senha
    const senhaValida = await bcrypt.compare(senha, usuario.senha_cripto);

    if (!senhaValida) {
      return NextResponse.json(
        { error: "Senha incorreta." },
        { status: 401 }
      );
    }

    // 3. Login válido — você pode gerar sessão, cookie ou só retornar ok
    return NextResponse.json(
      { message: "Login realizado com sucesso!", usuario },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Erro interno no login." },
      { status: 500 }
    );
  }
}
