
import { NextResponse } from "next/server";
import { ProjetoService } from "../projetosService";

export async function GET(requests, context) {
  try {

    // params agora é assíncrono!
    const { id } = await context.params;
    const projetoId = Number(id);
    if (isNaN(projetoId)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const projeto = await ProjetoService.getByID(projetoId);

    if (!projeto) {
      return NextResponse.json({ error: "Projeto não encontrado" }, { status: 404 });
    }

    return NextResponse.json(projeto);
  } catch (erro) {
    console.log("Erro ao buscar projeto:", erro);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
// PUT /api/projetos/:id - atualizar projeto
export async function PUT(req, { params }) {
  try {
    //aguarda o params
    // ✅ Pega params do contexto
    const id = params.id;
    const projetoId = Number(id);
    const dados = await req.json(); // dados para atualizar

    const projetoAtualizado = await prisma.projetos.update({
      where: projetoId,
      data: dados,
    });

    return NextResponse.json(projetoAtualizado, { status: 200 });
  } catch (error) {
    console.log("Erro no PUT /api/projetos/:id:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE /api/projetos/:id - deletar projeto
export async function DELETE(req, { params }) {
  try {
    // ✅ Pega params do contexto
    const id = params.id;
    const projetoId = Number(id);

    await prisma.projetos.delete({
      where: { id: projetoId },
    });

    return NextResponse.json({ message: "Projeto deletado com sucesso!" }, { status: 200 });
  } catch (error) {
    console.log("Erro no DELETE /api/projetos/:id:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
