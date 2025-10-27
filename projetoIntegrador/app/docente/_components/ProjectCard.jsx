'use client'
import Botao from './Botao';

export function ProjectCard({ projeto, onClick, onDelete }) {
  return (
    <div className='border rounded-lg shadow p-4 mt-2 bg-white'>
      <h2 className='text-lg font-semibold text-blue-600 text-center'>
        {projeto.nome}
      </h2>
      <p className='text-sm text-gray-500 mt-1 text-end'>
        Criado em: {new Date(projeto.data).toLocaleDateString()}
      </p>

      <div className="w-full flex justify-center gap-2 mt-4">
        <Botao onClick={onClick}>Ver mais</Botao>
        <Botao className="bg-red-600 hover:bg-red-700" onClick={() => onDelete(projeto.id)}>
          Excluir
        </Botao>
      </div>
    </div>
  );
}
