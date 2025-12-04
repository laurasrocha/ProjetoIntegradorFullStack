import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export const runtime = "nodejs";

// =========================
// GET /api/projetos/:id
// =========================
export async function GET(request, context) {
  try {
    const { id } = await context.params;
    const projetoId = Number(id);

    if (isNaN(projetoId)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const projeto = await prisma.projetos.findUnique({
      where: { id: projetoId },
    });

    if (!projeto) {
      return NextResponse.json({ error: "Projeto não encontrado" }, { status: 404 });
    }

    return NextResponse.json(projeto);
  } catch (erro) {
    console.log("Erro ao buscar projeto:", erro);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}

// =========================
// PUT /api/projetos/:id
// Atualização completa
// =========================
export async function PUT(req, context) {
  try {
    const { id } = await context.params;
    const projetoId = Number(id);

    const dados = await req.json();

    if (isNaN(projetoId)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    if (!dados || Object.keys(dados).length === 0) {
      return NextResponse.json({ error: "Nenhum dado enviado" }, { status: 400 });
    }

    // 🔴 SEPARAR os dados do projeto dos arquivos
    const { projetos, ...dadosProjeto } = dados;

    // Ajuste de status se necessário
    if (dadosProjeto.status !== undefined) {
      dadosProjeto.status_projeto = dadosProjeto.status;
      delete dadosProjeto.status;
    }

    // 🔴 1. Deletar arquivos antigos
    await prisma.projetoArquivo.deleteMany({
      where: { projetoId: projetoId }
    });

    // 🔴 2. Atualizar projeto principal
    const atualizado = await prisma.projetos.update({
      where: { id: projetoId },
      data: {
        ...dadosProjeto,
        // 🔴 3. Criar novos registros de arquivos (se houver)
        projetos: projetos && projetos.length > 0
          ? {
              create: projetos.map(item => ({
                url: item.url,
                tipo: item.tipo
              }))
            }
          : undefined
      },
      include: {
        projetos: true // 🔴 Incluir arquivos na resposta
      }
    });

    return NextResponse.json(atualizado);
  } catch (error) {
    console.error("Erro PUT:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// =========================
// PATCH /api/projetos/:id
// Atualização parcial (ex: status)
// =========================
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

// =========================
// DELETE /api/projetos/:id
// Remover projeto
// =========================
export async function DELETE(req, context) {
  try {
    const { id } = await context.params;
    const projetoId = Number(id);

    if (isNaN(projetoId)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    // Verifica se existe antes de deletar
    const existe = await prisma.projetos.findUnique({
      where: { id: projetoId },
    });

    if (!existe) {
      return NextResponse.json({ error: "Projeto não encontrado" }, { status: 404 });
    }

    await prisma.projetos.delete({
      where: { id: projetoId },
    });

    return NextResponse.json({ message: "Projeto deletado com sucesso" });
  } catch (error) {
    console.error("Erro DELETE:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}