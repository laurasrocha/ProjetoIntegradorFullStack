import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const usuarioId = Number(searchParams.get("usuarioId"));

    if (!usuarioId) {
      return NextResponse.json({ error: "ID não informado" }, { status: 400 });
    }

    const projetos = await prisma.projetos.findMany({
      where: { usuarioId },
      orderBy: { id: "desc" },
      include: {
        projetos: true,
        usuario: true,
      },
    });

    return NextResponse.json(projetos);
  } catch (error) {
    console.error("Erro ao buscar projetos do docente:", error);
    return NextResponse.json(
      { error: "Erro ao buscar projetos" },
      { status: 500 }
    );
  }
}
