'use client';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

export default function ProjectForm({ onProjectAdded }) {
  const URL_DOMINIO = process.env.NEXT_PUBLIC_URL_DOMINIO;

  const [nome_projeto, setNomeProjeto] = useState('');
  const [descricao, setDescricao] = useState('');
  const [membros_projeto, setMembrosProjeto] = useState('');
  const [turma_projeto, setTurmaProjeto] = useState('');
  const [data_apresentacao, setDataApresentacao] = useState('');
  const [convidados, setConvidados] = useState(false);
  const [detalhesConvidados, setDetalhesConvidados] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [status_projeto, setStatusProjeto] = useState('Pendente');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novoProjeto = {
      id: uuidv4(),
      nome_projeto,
      descricao,
      membros_projeto,
      turma_projeto,
      data_criacao: new Date(),
      data_apresentacao,
      convidados,
      detalhesConvidados,
      observacoes,
      status_projeto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      const res = await fetch(`${URL_DOMINIO}/projetos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoProjeto),
      });

      if (!res.ok) throw new Error();

      toast.success("Projeto salvo com sucesso! ✅");
      setNomeProjeto('');
      setDescricao('');
      setMembrosProjeto('');
      setTurmaProjeto('');
      setDataApresentacao('');
      setConvidados(false);
      setDetalhesConvidados('');
      setObservacoes('');
      setStatusProjeto('Pendente');

      onProjectAdded();
    } catch {
      toast.error("Erro ao salvar projeto ❌");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 w-[90%] max-w-md mx-auto border p-4 rounded shadow">
      <h2 className="text-lg font-bold mb-4 text-[#004A8D] dark:text-[#f29100]">Novo Projeto</h2>

      <div className="mb-3">
        <label className="block font-medium">Nome do Projeto</label>
        <input type="text" className="p-2 w-full rounded border-2 text-black" required
          value={nome_projeto} onChange={(e) => setNomeProjeto(e.target.value)} />
      </div>

      <div className="mb-3">
        <label className="block font-medium">Descrição</label>
        <textarea className="p-2 w-full rounded border-2 text-black"
          value={descricao} onChange={(e) => setDescricao(e.target.value)} />
      </div>

      <div className="mb-3">
        <label className="block font-medium">Membros do Projeto</label>
        <input className="p-2 w-full rounded border-2 text-black" required
          value={membros_projeto} onChange={(e) => setMembrosProjeto(e.target.value)} />
      </div>

      <div className="mb-3">
        <label className="block font-medium">Turma</label>
        <input className="p-2 w-full rounded border-2 text-black" required
          value={turma_projeto} onChange={(e) => setTurmaProjeto(e.target.value)} />
      </div>

      <div className="mb-3">
        <label className="block font-medium">Data de Apresentação</label>
        <input type="date" className="p-2 w-full rounded border-2 text-black"
          value={data_apresentacao} onChange={(e) => setDataApresentacao(e.target.value)} />
      </div>

      <div className="mb-3">
        <label className="block font-medium">Convidados?</label>
        <select className="p-2 w-full rounded border-2 text-black"
          value={convidados} onChange={(e) => setConvidados(e.target.value === "true")}>
          <option value="false">Não</option>
          <option value="true">Sim</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="block font-medium">Detalhes dos Convidados</label>
        <textarea className="p-2 w-full rounded border-2 text-black"
          value={detalhesConvidados} onChange={(e) => setDetalhesConvidados(e.target.value)} />
      </div>

      <div className="mb-3">
        <label className="block font-medium">Observações</label>
        <textarea className="p-2 w-full rounded border-2 text-black"
          value={observacoes} onChange={(e) => setObservacoes(e.target.value)} />
      </div>

      {}
      <div className="mb-3">
        <label className="block font-medium">Status</label>
        <select className="border p-2 w-full rounded" value={status_projeto}
          onChange={(e) => setStatusProjeto(e.target.value)}>
          <option value="Pendente">Pendente</option>
          <option value="Em andamento">Em andamento</option>
          <option value="Recusado">Recusado</option>
          <option value="Concluído">Concluído</option>
        </select>
      </div>

      <button type="submit"
        className="bg-[#004A8D] hover:bg-[#f29100] text-white px-4 py-2 rounded w-full mt-2 font-bold transition">
        Salvar Projeto ✅
      </button>
    </form>
  );
}
