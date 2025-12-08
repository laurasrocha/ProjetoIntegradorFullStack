import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

// POST /api/projetos/:id/feedback
export async function POST(req, { params }) {
  try {
    const { id } = await params;
    const projetoId = Number(id);
    const { feedback } = await req.json();

    if (!feedback || feedback.trim() === "") {
      return NextResponse.json(
        { error: "Feedback vazio." },
        { status: 400 }
      );
    }

    // Salvar feedback no banco
    const novo = await prisma.feedback.create({
      data: {
        projetoId,
        mensagem: feedback,
        criadoEm: new Date(),
      },
    });

    return NextResponse.json(novo, { status: 201 });

  } catch (error) {
    console.error("Erro ao salvar feedback:", error);
    return NextResponse.json(
      { error: "Erro interno ao salvar feedback" },
      { status: 500 }
    );
  }
}

export async function GET(req, context) {
  try {
    const { id } = await context.params;

    const feedbacks = await prisma.feedback.findMany({
      where: { projetoId: Number(id) },
      orderBy: { criadoEm: "desc" },
    });

    return NextResponse.json(feedbacks);
  } catch (error) {
    console.error("Erro ao buscar feedbacks:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
