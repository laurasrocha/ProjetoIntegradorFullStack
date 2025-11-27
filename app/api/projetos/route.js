import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const projetos = await prisma.projetos.findMany({ orderBy: { id: "desc" } });
    return NextResponse.json(projetos);
  } catch (error) {
    return NextResponse.json({ error: "Erro" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();

    // (Extração dos campos de texto continua igual)
    const nome_projeto = formData.get("nome_projeto");
    const descricao = formData.get("descricao");
    const membros_projeto = formData.get("membros_projeto");
    const turma_projeto = formData.get("turma_projeto");
    const data_apresentacao = formData.get("data_apresentacao");
    const convidados = formData.get("convidados") === "true";
    const detalhesConvidados = formData.get("detalhesConvidados");
    const observacoes = formData.get("observacoes");
    const usuarioId = 1; 

    const arquivos = formData.getAll("arquivos");
    const caminhosSalvos = [];

    const uploadDir = path.join(process.cwd(), "public/uploads");
    try { await mkdir(uploadDir, { recursive: true }); } catch (e) {}

    for (const file of arquivos) {
      if (file && file.name) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const nomeArquivo = `${Date.now()}-${file.name.replace(/\s/g, "_")}`;
        await writeFile(path.join(uploadDir, nomeArquivo), buffer);
        caminhosSalvos.push(`/uploads/${nomeArquivo}`);
      }
    }

    // ORDENAÇÃO INTELIGENTE (FOTOS PRIMEIRO)
    caminhosSalvos.sort((a, b) => {
        const aEhPdf = a.toLowerCase().endsWith('.pdf');
        const bEhPdf = b.toLowerCase().endsWith('.pdf');
        
        // Se A é PDF e B não é, joga A pro final (retorna 1)
        if (aEhPdf && !bEhPdf) return 1;
        // Se A não é PDF e B é, joga A pro começo (retorna -1)
        if (!aEhPdf && bEhPdf) return -1;
        // Se forem iguais, mantém a ordem
        return 0;
    });

    const projetoCriado = await prisma.projetos.create({
      data: {
        nome_projeto, descricao, membros_projeto, turma_projeto,
        data_apresentacao, convidados, detalhesConvidados, observacoes,
        usuarioId,
        fotos: caminhosSalvos.join(","), // Salva já ordenado
      },
    });

    return NextResponse.json(projetoCriado, { status: 201 });

  } catch (error) {
    console.error("Erro POST:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}