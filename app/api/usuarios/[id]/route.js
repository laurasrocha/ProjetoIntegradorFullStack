import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // ou import do seu prisma
import { UsuariosService } from "../usuariosService";

// GET /api/usuarios/:id
export async function GET(req, context) {
  try {
    const { id } = context.params; // ✅ sem await
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
    console.log("Erro ao buscar usuário:", erro);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}

// PUT /api/usuarios/:id
export async function PUT(req, context) {
  try {
    const { id } = context.params; // ✅ sem await
    const usuariosId = Number(id);
    const dados = await req.json(); // dados para atualizar

    const usuarioAtualizado = await prisma.usuarios.update({
      where: { id: usuariosId }, // ✅ precisa ser objeto
      data: dados,
    });

    return NextResponse.json(usuarioAtualizado, { status: 200 });
  } catch (error) {
    console.log("Erro no PUT /api/usuarios/:id:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE /api/usuarios/:id
export async function DELETE(req, context) {
  try {
    const { id } = context.params; // ✅ sem await
    const usuariosId = Number(id);

    await prisma.usuarios.delete({
      where: { id: usuariosId }, // ✅ precisa ser objeto
    });

    return NextResponse.json({ message: "Usuário deletado com sucesso!" }, { status: 200 });
  } catch (error) {
    console.log("Erro no DELETE /api/usuarios/:id:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
