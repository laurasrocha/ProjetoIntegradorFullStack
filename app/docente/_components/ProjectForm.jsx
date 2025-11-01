"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

// 🚨 COMPONENTE Botao REMOVIDO DAQUI

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

// URL do backend
const URL_DOMINIO = process.env.NEXT_PUBLIC_URL_DOMINIO;

// (SUBSTITUTO DO Botao.jsx)
function SimpleButton({ children, className = "", ...props }) {
  return (
    <button
      className={`w-[200px] h-[35px] sm:h-[40px] cursor-pointer text-white py-2 sm:py-3 rounded-2xl bg-[#004A8D] shadow-md text-xs font-semibold uppercase transition-all
  duration-500 ease-in-out hover:tracking-wide hover:bg-orange-400 hover:text-white hover:shadow-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FFFFFF]
  active:tracking-wide active:bg-gray-300 active:text-white active:shadow-none active:translate-y-2 active:duration-100 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

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
      usuarioId: 1, // Se necessário, pode vir do auth
    };

    try {
      const res = await axios.post(`${URL_DOMINIO}/projetos`, dados);
      console.log("Dados enviados:", dados);
      console.log("Resposta do backend:", res.data);

      toast.success(`Projeto "${dados.nome_projeto}" criado com sucesso.`);

      // Limpa o formulário e fecha o Sheet
      resetForm();
      setOpen(false);
      // Atualiza a lista de projetoss
      buscarProjetos();
    } catch (err) {
      console.error("Erro ao cadastrar projeto:", err);
      // Garante que o erro seja uma string
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        `Projeto "${dados.nome_projeto}" não foi criado.`;
      toast.error(errorMessage);
    }
  };

  return (
    <div className="text-center space-x-4">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <SimpleButton>Novo Projeto</SimpleButton>
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
                Nome do Projeto
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
              <label className="text-sm font-medium mb-1">
                Código da Turma
              </label>
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
                Membros do Projeto
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
                Data de Apresentação
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
              <SimpleButton>Anexar fotos ao projeto</SimpleButton>
              <SimpleButton onClick={handleSubmit}>
                Concluir cadastro
              </SimpleButton>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
