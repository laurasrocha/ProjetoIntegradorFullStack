"use client";
import React from "react";
import { updateProjectStatus, deleteProject } from "./actions";

export default function ProjectCard({ project, onStatusChange }) {
  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    updateProjectStatus(project.id, newStatus);
    onStatusChange(); // atualiza a lista
  };

  const handleDelete = () => {
    if (confirm("Tem certeza que deseja excluir este projeto?")) {
      deleteProject(project.id);
      onStatusChange();
    }
  };

  return (
    <div className="border shadow p-4 rounded-md w-[300px]">
      <h2 className="text-blue-700 text-lg font-semibold">{project.nome}</h2>
      <p className="text-sm text-gray-600 dark:text-[#f29100]">Criado em: {project.dataCriacao}</p>

      <div className="mt-2">
        <label className="text-sm font-medium">Status:</label>
        <select
          value={project.status}
          onChange={handleStatusChange}
          className="block w-full mt-1 p-1 border rounded"
        >
          <option value="Pendente">Pendente</option>
          <option value="Em andamento">Em andamento</option>
          <option value="Recusado">Recusado</option>
          <option value="Concluído">Concluído</option>
        </select>
      </div>

      <button
        onClick={handleDelete}
        className="mt-3 text-sm text-red-600 hover:underline"
      >
        Excluir projeto
      </button>
    </div>
  );
}
