//para o next conseguir diferenciar quando é arquivo e quando não há.

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(req, { params }) {
  try {
    const projetoId = Number(params.id);
    const contentType = req.headers.get("content-type") || "";

    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json({ error: "Envie arquivos via formData" }, { status: 400 });
    }

    const formData = await req.formData();
    const arquivos = formData.getAll("arquivos");

    if (!arquivos || arquivos.length === 0) {
      return NextResponse.json({ error: "Nenhum arquivo enviado" }, { status: 400 });
    }

    const urlsSalvas = [];

    for (const file of arquivos) {
      if (!(file instanceof File)) continue;

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Nome único
      const nomeArquivo = `${projetoId}-${Date.now()}-${file.name.replace(/\s/g, "_")}`;

      // Upload para Supabase
      const { data, error } = await supabase.storage
        .from("projetos")
        .upload(nomeArquivo, buffer, {
          contentType: file.type,
          upsert: false,
        });

      if (error) {
        console.error("Erro Supabase:", error);
        continue;
      }

      // URL pública
      const urlPublica = `${process.env.SUPABASE_URL}/storage/v1/object/public/projetos/${data.path}`;
      urlsSalvas.push(urlPublica);

      // Salvar no Prisma
      await prisma.projetoArquivo.create({
        data: {
          projetoId,
          url: urlPublica,
        },
      });
    }

    return NextResponse.json(
      { mensagem: "Arquivos enviados!", urls: urlsSalvas },
      { status: 201 }
    );

  } catch (error) {
    console.error("ERRO NO UPLOAD:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
