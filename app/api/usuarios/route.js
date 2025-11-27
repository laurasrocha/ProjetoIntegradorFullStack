// api/login_user/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { user, senha } = await req.json();

    // Buscar usuário
    const usuario = await prisma.usuarios.findUnique({
      where: { email_usuario: user },
    });

    if (!usuario) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 400 }
      );
    }

    // Comparar senhas
    const senhaValida = await bcrypt.compare(senha, usuario.senha_cripto);

    if (!senhaValida) {
      return NextResponse.json(
        { error: "Senha incorreta" },
        { status: 401 }
      );
    }

    // Criar token JWT
    const token = jwt.sign(
      {
        id: usuario.id,
        tipo: usuario.tipo_usuario,
        email: usuario.email_usuario,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    // Mandar cookie HttpOnly
    const response = NextResponse.json(
      { message: "Login realizado com sucesso!" },
      { status: 200 }
    );

    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Erro interno no login." },
      { status: 500 }
    );
  }
}
