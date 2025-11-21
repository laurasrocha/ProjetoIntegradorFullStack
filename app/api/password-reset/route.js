import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { token, novaSenha } = await req.json();

    if (!token || !novaSenha) {
      return NextResponse.json(
        { error: "Token ou nova senha ausentes." },
        { status: 400 }
      );
    }

    // 1. Buscar token no banco
    const tokenRecord = await prisma.passwordResetToken.findUnique({
      where: { token },
      include: { usuario: true },
    });

    if (!tokenRecord) {
      return NextResponse.json(
        { error: "Token inválido ou expirado." },
        { status: 400 }
      );
    }

    // 2. Verificar expiração
    if (new Date() > tokenRecord.expiresAt) {
      return NextResponse.json(
        { error: "Token expirado." },
        { status: 400 }
      );
    }

    // 3. Criptografar nova senha
    const senhaHash = await bcrypt.hash(novaSenha, 10);

    // 4. Atualizar senha do usuário (CORRIGIDO)
    await prisma.usuarios.update({
      where: { id: tokenRecord.usuario.id },
      data: { senha_cripto: senhaHash },
    });

    // 5. Deletar token após o uso
    await prisma.passwordResetToken.delete({
      where: { token },
    });

    return NextResponse.json({ message: "Senha redefinida com sucesso!" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Erro interno ao redefinir senha." },
      { status: 500 }
    );
  }
}
