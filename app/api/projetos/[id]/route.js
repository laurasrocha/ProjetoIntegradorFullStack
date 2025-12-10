import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export const runtime = "nodejs";

export async function GET(request, context) {
  try {
    const { id } = await context.params;
    const projetoId = Number(id);

    const projeto = await prisma.projetos.findUnique({
      where: { id: projetoId },
      include: {
        usuario: true,
        projetos: true, // Aqui é correto, pois o schema usa este nome
        feedbacks: true,
      }
    });

    if (!projeto) {
      return NextResponse.json({ error: "Projeto não encontrado" }, { status: 404 });
    }

    return NextResponse.json(projeto);
  } catch (erro) {
    console.error("Erro ao buscar projeto:", erro);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}


export async function PUT(req, context) {
  try {
    const { id } = await context.params;
    const projetoId = Number(id);

    const { projetos: novosArquivos, ...dadosProjeto } = await req.json();

    // Remover campos proibidos
    delete dadosProjeto.id;
    delete dadosProjeto.UUID;
    delete dadosProjeto.createdAt;
    delete dadosProjeto.updatedAt;
    delete dadosProjeto.usuario;
    delete dadosProjeto.feedbacks;

    if (dadosProjeto.status) {
      dadosProjeto.status_projeto = dadosProjeto.status;
      delete dadosProjeto.status;
    }

    // Buscar arquivos existentes
    const arquivosExistentes = await prisma.projetoArquivo.findMany({
      where: { projetoId }
    });

    // Filtrar novos arquivos que ainda não existem
    const arquivosParaCriar = (novosArquivos || []).filter(
      novo =>
        !arquivosExistentes.some(
          existente => existente.url === novo.url
        )
    );

    // Atualizar projeto SEM deletar arquivos já existentes
    const atualizado = await prisma.projetos.update({
      where: { id: projetoId },
      data: {
        ...dadosProjeto,
        projetos: {
          create: arquivosParaCriar.map(file => ({
            url: file.url,
            tipo: file.tipo
          }))
        }
      },
      include: {
        projetos: true
      }
    });

    return NextResponse.json(atualizado);

  } catch (error) {
    console.error("Erro PUT:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function PATCH(req, { params }) {
  try {
    const projetoId = Number(params.id);

    if (isNaN(projetoId)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const dados = await req.json();

    if (!dados || Object.keys(dados).length === 0) {
      return NextResponse.json(
        { error: "Nenhum dado enviado" },
        { status: 400 }
      );
    }

    // Ajusta status para o campo correto
    if (dados.status !== undefined) {
      dados.status_projeto = dados.status;
      delete dados.status;
    }

    // Campos proibidos (não podem ser atualizados)
    const camposBloqueados = [
      "id",
      "UUID",
      "createdAt",
      "updatedAt",
      "usuario",
      "usuarioId",
    ];

    camposBloqueados.forEach((campo) => delete dados[campo]);

    const atualizado = await prisma.projetos.update({
      where: { id: projetoId },
      data: dados,
    });

    return NextResponse.json(atualizado, { status: 200 });
  } catch (error) {
    console.error("Erro PATCH /projetos/[id]:", error);

    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Projeto não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Erro interno ao atualizar" },
      { status: 500 }
    );
  }
}


export async function DELETE(req, context) {
  try {
    const { id } = await context.params; // ← obrigatório no Next 15/16
    const projetoId = Number(id);

    if (isNaN(projetoId)) {
      return NextResponse.json(
        { error: "ID inválido" },
        { status: 400 }
      );
    }

    await prisma.$transaction([
      prisma.feedback.deleteMany({
        where: {
          projetoId: Number(projetoId),
        },
      }),

      prisma.projetoArquivo.deleteMany({
        where: {
          projetoId: Number(projetoId),
        },
      }),

      prisma.projetos.delete({
        where: { id: Number(projetoId) },
      }),
    ]);

    return NextResponse.json({ message: "Projeto deletado com sucesso" });

  } catch (error) {
    console.error("Erro DELETE:", error);
    return NextResponse.json(
      { error: error.message || "Erro interno ao deletar projeto" },
      { status: 500 }
    );
  }
}

