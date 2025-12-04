import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

// GET -> lista todos os projetos
export async function GET() {
  try {
    const projetos = await prisma.projetos.findMany({
      orderBy: { id: "desc" },
      include: {
        projetos: true, // Inclui as fotos/arquivos do Supabase
      },
    });

    return NextResponse.json(projetos);
  } catch (error) {
    console.error("Erro GET:", error);
    return NextResponse.json({ error: "Erro ao listar projetos" }, { status: 500 });
  }
}

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
      projetos // <-- AGORA é um array de URLs
    } = body;

    const projetoCriado = await prisma.projetos.create({
      data: {
        nome_projeto,
        descricao: descricao || "sem descrição",
        membros_projeto,
        turma_projeto,
        data_apresentacao,
        convidados,
        detalhesConvidados,
        observacoes,
        usuarioId: usuarioId || null, // 🔴 CORREÇÃO AQUI: use usuarioId diretamente

        // Criar registros na tabela ProjetoArquivo
        projetos: projetos && projetos.length > 0
          ? {
              create: projetos.map((url) => ({
                url,
                tipo: url.endsWith(".pdf") ? "pdf" : "image"
              }))
            }
          : undefined
      },
      include: {
        projetos: true
      }
    });

    return NextResponse.json(projetoCriado, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar projeto:", error);
    return NextResponse.json(
      { error: "Erro interno ao cadastrar" },
      { status: 500 }
    );
  }
}