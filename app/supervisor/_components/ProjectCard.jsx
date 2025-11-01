"use client";
import React from "react";
import { updateProjectStatus, deleteProject } from "./actions";

// ✅ Função para trocar cor da bolinha de acordo com o status
const getStatusColor = (status) => {
  switch (status) {
    case "Concluído":
      return "bg-green-500";
    case "Em andamento":
      return "bg-blue-500";
    case "Recusado":
      return "bg-red-500";
    case "Pendente":
    default:
      return "bg-yellow-400";
  }
};

export default function ProjectCard({ project, onStatusChange }) {
  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    updateProjectStatus(project.id, newStatus);
    onStatusChange();
  };

  const handleDelete = () => {
    if (confirm("Tem certeza que deseja excluir este projeto?")) {
      deleteProject(project.id);
      onStatusChange();
    }
  };

  return (
    <div className="border shadow p-4 rounded-md w-[300px] relative bg-[#1c2530] text-white">

      {/* ✅ Bolinha de status */}
      <div className="absolute top-3 right-3">
        <span className={`w-3 h-3 rounded-full ${getStatusColor(project.status)}`}></span>
      </div>

      <h2 className="text-lg font-semibold">{project.nome}</h2>
      <p className="text-sm opacity-80">Criado em: {project.dataCriacao}</p>

      <div className="mt-3">
        <label className="text-sm font-medium">Status:</label>
        <select
          value={project.status}
          onChange={handleStatusChange}
          className="block w-full mt-1 p-1 rounded text-black"
        >
          <option value="Pendente">Pendente</option>
          <option value="Em andamento">Em andamento</option>
          <option value="Recusado">Recusado</option>
          <option value="Concluído">Concluído</option>
        </select>
      </div>

      <button
        onClick={handleDelete}
        className="mt-3 text-sm text-red-400 hover:text-red-200 transition font-semibold"
      >
        Excluir projeto
      </button>
    </div>
  );
}
