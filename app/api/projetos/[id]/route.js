import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";

// GET: Buscar projeto pelo ID
export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const projetoId = parseInt(id);

    if (isNaN(projetoId)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const projeto = await prisma.projetos.findUnique({
      where: { id: projetoId },
    });

    if (!projeto) {
      return NextResponse.json(
        { error: "Projeto não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(projeto, { status: 200 });
  } catch (error) {
    console.error("Erro no GET:", error);
    return NextResponse.json(
      { error: "Erro interno ao buscar projeto" },
      { status: 500 }
    );
  }
}

// PUT: Atualizar projeto (Com lógica de manter/excluir fotos)
export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const projetoId = parseInt(id);
    const contentType = req.headers.get("content-type") || "";
    let dadosParaAtualizar = {};

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();

      // (Extração de dados igual ao anterior) 
      formData.forEach((value, key) => {
        if (key !== "arquivos" && key !== "fotosMantidas") {
          if (key === "convidados") dadosParaAtualizar[key] = value === "true";
          else if (key === "usuarioId")
            dadosParaAtualizar[key] = parseInt(value);
          else if (
            key !== "id" &&
            key !== "usuario" &&
            key !== "fotos" &&
            key !== "createdAt" &&
            key !== "updatedAt" &&
            key !== "UUID"
          ) {
            dadosParaAtualizar[key] = value;
          }
        }
      });

      const uploadDir = path.join(process.cwd(), "public/uploads");
      try {
        await mkdir(uploadDir, { recursive: true });
      } catch (e) {}

      const fotosMantidas = formData.getAll("fotosMantidas");
      const projetoAntigo = await prisma.projetos.findUnique({
        where: { id: projetoId },
      });

      if (projetoAntigo?.fotos) {
        const fotosNoBanco = projetoAntigo.fotos.split(",");
        for (const foto of fotosNoBanco) {
          if (!fotosMantidas.includes(foto)) {
            try {
              await unlink(path.join(process.cwd(), "public", foto));
            } catch (e) {}
          }
        }
      }

      const novosArquivos = formData.getAll("arquivos");
      const caminhosNovos = [];

      for (const file of novosArquivos) {
        if (file instanceof File) {
          const buffer = Buffer.from(await file.arrayBuffer());
          const nomeArquivo = `${Date.now()}-${file.name.replace(/\s/g, "_")}`;
          await writeFile(path.join(uploadDir, nomeArquivo), buffer);
          caminhosNovos.push(`/uploads/${nomeArquivo}`);
        }
      }

      // Junta tudo
      let listaFinal = [...fotosMantidas, ...caminhosNovos];

      // ORDENAÇÃO INTELIGENTE (FOTOS PRIMEIRO) 
      listaFinal.sort((a, b) => {
        const aEhPdf = a.toLowerCase().endsWith(".pdf");
        const bEhPdf = b.toLowerCase().endsWith(".pdf");

        if (aEhPdf && !bEhPdf) return 1; // PDF vai pro fim
        if (!aEhPdf && bEhPdf) return -1; // Imagem vai pro início
        return 0;
      });

      dadosParaAtualizar.fotos = listaFinal.join(",");
    } else {
      // (Lógica JSON igual) 
      const dados = await req.json();
      const { id, fotos, usuario, createdAt, updatedAt, UUID, ...dadosLimpos } =
        dados;
      dadosParaAtualizar = dadosLimpos;
    }

    const projetoAtualizado = await prisma.projetos.update({
      where: { id: projetoId },
      data: dadosParaAtualizar,
    });

    return NextResponse.json(projetoAtualizado, { status: 200 });
  } catch (error) {
    console.error("Erro PUT:", error);
    if (error.code === "P2025")
      return NextResponse.json({ error: "Não encontrado" }, { status: 404 });
    return NextResponse.json(
      { error: "Erro interno: " + error.message },
      { status: 500 }
    );
  }
}

// DELETE: Deletar projeto
export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    const projetoId = parseInt(id);

    // Apagar fotos físicas antes de deletar registro
    const projeto = await prisma.projetos.findUnique({
      where: { id: projetoId },
    });
    if (projeto?.fotos) {
      const listaFotos = projeto.fotos.split(",");
      for (const foto of listaFotos) {
        try {
          await unlink(path.join(process.cwd(), "public", foto));
        } catch (e) {}
      }
    }

    await prisma.projetos.delete({
      where: { id: projetoId },
    });

    return NextResponse.json(
      { message: "Deletado com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro no DELETE:", error);
    return NextResponse.json(
      { error: "Erro interno ao deletar" },
      { status: 500 }
    );
  }
}
