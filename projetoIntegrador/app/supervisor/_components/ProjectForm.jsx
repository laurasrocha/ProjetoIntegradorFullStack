'use client';
import React, { useState } from 'react';
import { addProject } from './actions';
import { v4 as uuidv4 } from 'uuid';

export default function ProjectForm({ onProjectAdded }) {
  const [nome, setNome] = useState('');
  const [status, setStatus] = useState('Pendente');

  const handleSubmit = (e) => {
    e.preventDefault();

    const novoProjeto = {
      id: uuidv4(),
      nome,
      status,
      dataCriacao: new Date().toLocaleDateString('pt-BR'),
    };

    addProject(novoProjeto);
    setNome('');
    setStatus('Pendente');
    onProjectAdded(); // Atualiza lista
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 w-[90%] max-w-md mx-auto border p-4 rounded shadow">
      <h2 className="text-lg font-bold mb-4 text-[#004A8D] dark:text-[#f29100]">Novo Projeto</h2>

      <div className="mb-3">
        <label className="block font-medium">Nome do Projeto</label>
        <input
          type="text"
          className="p-2 w-full rounded border-2 text-black dark:text-white border-[#004A8D]"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="block font-medium">Status</label>
        <select
          className="border p-2 w-full rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Pendente">Pendente</option>
          <option value="Em andamento">Em andamento</option>
          <option value="Recusado">Recusado</option>
          <option value="Concluído">Concluído</option>
        </select>
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full mt-2 font-bold">
        Salvar Projeto
      </button>
    </form>
  );
}
