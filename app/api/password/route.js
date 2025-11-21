
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { prisma } from "@/lib/prisma"; 

export async function POST(req) {
  try {
    //para não receber o body vazio e dar erro
    const body = await req.json();
    console.log("BODY RECEBIDO:", body);

    const { email } = body;


    // 1. Procurar usuário no banco 
    const user = await prisma.usuarios.findFirst({
      where: { email_usuario: email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Email não encontrado." },
        { status: 404 }
      );
    }

    // 2. Gerar token aleatório
    const token = crypto.randomBytes(32).toString("hex");

    // 3. Salvar token no banco, com validade de 1h
    await prisma.passwordResetToken.create({
      data: {
        token,
        userId: user.id,
        expiresAt: new Date(Date.now() + 3600 * 1000), // 1 hora
      },
    });

    // 4. Criar link de recuperação
   const link = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password/${token}`;

    // 5. Transporter para Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 6. Enviar o email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Recuperação de senha",
      text: `Olá! Clique no link abaixo para redefinir sua senha:\n\n${link}\n\nEste link expira em 1 hora.`,
    });

    return NextResponse.json({
      message: "Email de recuperação enviado com sucesso!",
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao enviar o e-mail." },
      { status: 500 }
    );
  }
}
