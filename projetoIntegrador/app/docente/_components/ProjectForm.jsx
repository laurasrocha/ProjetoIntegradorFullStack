"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

import Botao from "./Botao";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

// URL do backend
const URL_DOMINIO = process.env.NEXT_PUBLIC_URL_DOMINIO;

export function ProjectForm({ buscarProjetos }) {
  // Controle do formulário
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [membros, setMembros] = useState("");
  const [turma, setTurma] = useState("");
  const [data, setData] = useState("");
  const [convidados, setConvidados] = useState("");
  const [detalhesConvidados, setDetalhesConvidados] = useState("");
  const [temObservacao, setTemObservacao] = useState(false);
  const [observacaoTexto, setObservacaoTexto] = useState("");

  // Função para resetar todos os campos
  const resetForm = () => {
    setNome("");
    setDescricao("");
    setMembros("");
    setTurma("");
    setData("");
    setConvidados("");
    setDetalhesConvidados("");
    setTemObservacao(false);
    setObservacaoTexto("");
  };

  // Função de submit
  const handleSubmit = async () => {
    if (!nome || !membros || !data) {
      return toast.error("Preencha os campos obrigatórios.");
    }

    const dados = {
      nome_projeto: nome,
      descricao,
      membros_projeto: membros,
      turma_projeto: turma,
      data_apresentacao: data,
      convidados: convidados === "sim",
      detalhesConvidados: convidados === "sim" ? detalhesConvidados : "",
      observacoes: temObservacao ? observacaoTexto : "",
      usuarioId: 1, // se necessário, pode vir do auth
    };

    try {
      const res = await axios.post(`${URL_DOMINIO}/projetos`, dados);
      console.log("Dados enviados:", dados);
      console.log("Resposta do backend:", res.data);

      toast.success(`Projeto "${dados.nome_projeto}" criado com sucesso.`);

      // Limpa o formulário e fecha o Sheet
      resetForm();
      setOpen(false);
      //atualiza a lista de projetoss
      buscarProjetos();
    } catch (err) {
      console.error("Erro ao cadastrar projeto:", err);
      toast.error(`Projeto "${dados.nome_projeto}" não foi criado.`);
    }
  };

  return (
    <div className="text-center space-x-4">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Botao>Novo Projeto</Botao>
        </SheetTrigger>

        <SheetContent className="bg-white p-0 dark:bg-gray-800">
          <SheetHeader className="p-4 border-b">
            <SheetTitle className="text-center mt-2">
              Cadastrar Novo Projeto
            </SheetTitle>
          </SheetHeader>

          <div className="p-4 overflow-y-auto max-h-[calc(100vh-100px)] flex flex-col space-y-4">
            {/* Nome */}
            <div>
              <label className="text-sm font-medium mb-1">
                Qual será o nome do projeto?
              </label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full border rounded p-2 text-sm"
                placeholder="Ex: Aplicativo de Saúde"
              />
            </div>

            {/* Descrição */}
            <div>
              <label className="text-sm font-medium mb-1">Descrição:</label>
              <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                className="w-full border rounded p-2 text-sm h-60"
                placeholder="Ex: O projeto é para..."
              />
            </div>

            {/* Turma */}
            <div>
              <label className="text-sm font-medium mb-1">Qual a turma?</label>
              <input
                type="text"
                value={turma}
                onChange={(e) => setTurma(e.target.value)}
                className="w-full border rounded p-2 text-sm"
                placeholder="Ex: 035"
              />
            </div>

            {/* Membros */}
            <div>
              <label className="text-sm font-medium mb-1">
                Quem serão os membros do projeto?
              </label>
              <input
                type="text"
                value={membros}
                onChange={(e) => setMembros(e.target.value)}
                className="w-full border rounded p-2 text-sm"
                placeholder="Ex: João, Maria, Pedro"
              />
            </div>

            {/* Data de apresentação */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Qual será a data de apresentação?
              </label>
              <input
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
                className="w-full border rounded p-2 text-sm"
              />
            </div>

            {/* Convidados */}
            <div>
              <label className="block text-sm font-medium mb-1">
                A apresentação contará com a presença de convidados?
              </label>
              <div className="flex space-x-4">
                <label>
                  <input
                    type="radio"
                    value="sim"
                    checked={convidados === "sim"}
                    onChange={() => setConvidados("sim")}
                  />{" "}
                  Sim
                </label>
                <label>
                  <input
                    type="radio"
                    value="nao"
                    checked={convidados === "nao"}
                    onChange={() => setConvidados("nao")}
                  />{" "}
                  Não
                </label>
              </div>

              {convidados === "sim" && (
                <input
                  type="text"
                  placeholder="Digite os detalhes dos convidados"
                  className="w-full border rounded p-2 text-sm mt-2"
                  value={detalhesConvidados}
                  onChange={(e) => setDetalhesConvidados(e.target.value)}
                />
              )}
            </div>

            {/* Observações */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Deseja adicionar alguma observação?
              </label>
              <div className="flex space-x-4">
                <label>
                  <input
                    type="radio"
                    checked={temObservacao === true}
                    onChange={() => setTemObservacao(true)}
                  />{" "}
                  Sim
                </label>
                <label>
                  <input
                    type="radio"
                    checked={temObservacao === false}
                    onChange={() => setTemObservacao(false)}
                  />{" "}
                  Não
                </label>
              </div>

              {temObservacao && (
                <textarea
                  placeholder="Digite sua observação"
                  className="w-full border rounded p-2 text-sm mt-2"
                  value={observacaoTexto}
                  onChange={(e) => setObservacaoTexto(e.target.value)}
                />
              )}
            </div>

            {/* Botões */}
            <div className="w-full space-y-4 flex flex-col justify-center items-center">
              <Botao>Anexar fotos ao projeto</Botao>
              <Botao onClick={handleSubmit}>Concluir cadastro</Botao>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
