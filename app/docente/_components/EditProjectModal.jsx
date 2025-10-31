"use client";
import { useState } from "react";

export function EditProjectModal({ projeto, onClose, onSave }) {
  const [formData, setFormData] = useState({ ...projeto, 
    detalhesConvidados: projeto.detalhesConvidados || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
    // Se estiver alterando detalhesConvidados, atualiza também o boolean
    if (name === "detalhesConvidados") {
      return { ...prev, [name]: value, convidados: value.trim() !== "" }; //value.trim() !== "" → se o textarea tiver algum texto, convidados vira true; se estiver vazio, vira false.
    }
    return { ...prev, [name]: value };
  });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // chamando atualizarProjeto
    onClose(); // fecha o modal
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-[90%] sm:w-[500px]">
        <h2 className="text-lg font-semibold mb-4">Editar Projeto</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nome_projeto"
            value={formData.nome_projeto}
            onChange={handleChange}
            placeholder="Nome do projeto"
            className="w-full p-2 border rounded-lg"
            required
          />

          <textarea
            name="observacoes"
            value={formData.observacoes}
            onChange={handleChange}
            placeholder="Observações"
            className="w-full p-2 border rounded-lg"
            rows={3}
          />

          <input
            type="text"
            name="membros_projeto"
            value={formData.membros_projeto}
            onChange={handleChange}
            placeholder="Membros"
            className="w-full p-2 border rounded-lg"
          />

          <input
            type="date"
            name="data_apresentacao"
            value={formData.data_apresentacao}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />

          <textarea
            name="detalhesConvidados"
            value={formData.detalhesConvidados}
            onChange={handleChange}
            placeholder="Convidados"
            className="w-full p-2 border rounded-lg"
            rows={2}
          />

          {/* <div>
            <label className="block text-sm">Nome do Projeto</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg text-shadow-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm">Observações</label>
            <textarea
              name="observacao"
              value={formData.observacao}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg text-shadow-white"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm">Membros</label>
            <input
              type="text"
              name="membros"
              value={formData.membros}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg  text-shadow-white"
            />
          </div>

          <div>
            <label className="block text-sm">Data de Apresentação</label>
            <input
              type="date"
              name="dataApresentacao"
              value={formData.dataApresentacao}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg  text-shadow-white"
            />
          </div>

          <div>
            <label className="block text-sm">A apresentação contará com a presença de convidados?</label>
            <textarea
              name="convidados"
              value={formData.convidados}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg  text-shadow-white"
              rows={2}
            />
          </div> */}

          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
