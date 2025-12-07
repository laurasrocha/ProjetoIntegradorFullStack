import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { user, senha } = await req.json();

    if (!user || !senha) {
      return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
    }

    const usuario = await prisma.usuarios.findUnique({
      where: { email_usuario: user },
    });

    if (!usuario) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 400 });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha_cripto);
    if (!senhaValida) {
      return NextResponse.json({ error: "Senha incorreta" }, { status: 401 });
    }

    // Preparar dados do usuário para enviar ao front
    const usuarioData = {
      id: usuario.id,
      nome: usuario.nome_usuario,
      tipo_usuario: usuario.tipo_usuario,
      email: usuario.email_usuario
    };

    // Gerar JWT
    const token = jwt.sign(
      { id: usuario.id, tipo: usuario.tipo_usuario },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    // Retornar resposta com cookie
    const response = NextResponse.json({ message: "Login realizado!", usuario: usuarioData });
    response.cookies.set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      path: "/",
      maxAge: 2 * 60 * 60, // 2 horas
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return response;

  } catch (err) {
    console.error("ERRO LOGIN:", err);
    return NextResponse.json({ error: "Erro interno no login" }, { status: 500 });
  }
}
