import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

// GET -> lista todos os projetos
export async function GET() {
  try {
    const projetos = await prisma.projetos.findMany({
      orderBy: { id: "desc" },
    });

    return NextResponse.json(projetos);
  } catch (error) {
    console.error("Erro GET:", error);
    return NextResponse.json({ error: "Erro ao listar projetos" }, { status: 500 });
  }
}

// POST -> cria projeto (AGORA sem uploads!!!)

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      nome_projeto,
      descricao,
      membros_projeto,
      turma_projeto,
      data_apresentacao,
      convidados,
      detalhesConvidados,
      observacoes,
      usuarioId,
      fotos
    } = body;

    const projetoCriado = await prisma.projetos.create({
      data: {
        nome_projeto,
        descricao,
        membros_projeto,
        turma_projeto,
        data_apresentacao,
        convidados,
        detalhesConvidados,
        observacoes,
        usuarioId,
        fotos // URLs vindas do frontend já separadas por vírgula
      }
    });

    return NextResponse.json(projetoCriado, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar projeto:", error);
    return NextResponse.json({ error: "Erro interno ao cadastrar" }, { status: 500 });
  }
}