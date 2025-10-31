//route [id] usuários
import { NextResponse } from "next/server";
import { UsuariosService } from "../usuariosService";

export async function GET(requests, context) {
  try {

    // params agora é assíncrono!
    const { id } = await context.params;
    const usuariosId = Number(id);
    if (isNaN(usuariosId)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const usuario = await UsuariosService.getByID(usuariosId);

    if (!usuario) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    return NextResponse.json(usuario);
  } catch (erro) {
    console.log("Erro ao buscar projeto:", erro);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
// PUT /api/usuarios/:id - atualizar projeto
export async function PUT(req, { params }) {
  try {
    //aguarda o params
    // ✅ Pega params do contexto
    const id = params.id;
    const usuariosId = Number(id);
    const dados = await req.json(); // dados para atualizar

    const usuarioAtualizado = await prisma.usuarios.update({
      where: usuariosId,
      data: dados,
    });

    return NextResponse.json(usuarioAtualizado, { status: 200 });
  } catch (error) {
    console.log("Erro no PUT /api/usuarios/:id:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE /api/usuarios/:id - deletar projeto
export async function DELETE(req, { params }) {
  try {
    // ✅ Pega params do contexto
    const id = params.id;
    const usuariosId = Number(id);

    await prisma.usuarios.delete({
      where: { id: usuariosId },
    });

    return NextResponse.json({ message: "Usuário deletado com sucesso!" }, { status: 200 });
  } catch (error) {
    console.log("Erro no DELETE /api/usuarios/:id:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
