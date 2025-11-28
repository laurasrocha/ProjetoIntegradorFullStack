
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

/// PATCH - atualização parcial (ideal para status)
export async function PATCH(req, context) {
  try {
    const { id } = await context.params;
    const projetoId = Number(id);
    const dados = await req.json();

     
    // Ajuste para o campo correto do banco
    if (dados.status !== undefined) {
      dados.status_projeto = dados.status;
      delete dados.status;
    }

    if (!dados || Object.keys(dados).length === 0) {
      return NextResponse.json({ error: "Nenhum dado enviado" }, { status: 400 });
    }

    const atualizado = await prisma.projetos.update({
      where: { id: projetoId },
      data: dados,
    });

    return NextResponse.json(atualizado);
  } catch (error) {
    console.error("Erro no PATCH /projetos/:id:", error);
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
