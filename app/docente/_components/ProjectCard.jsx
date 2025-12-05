// ProjectCard.jsx
'use client'

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
        <button onClick={onClick}
          className="w-[200px] h-[35px] sm:h-[40px] cursor-pointer text-white py-2 sm:py-3 rounded-2xl bg-[#004A8D] shadow-md text-xs font-semibold uppercase transition-all
      duration-500 ease-in-out hover:tracking-wide hover:bg-orange-400 hover:text-white hover:shadow-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FFFFFF]
      active:tracking-wide active:bg-gray-300 active:text-white active:shadow-none active:translate-y-2 active:duration-100F">Ver mais</button>

        <button className="bg-red-600 hover:bg-red-700" onClick={() => onDelete(projeto.id)}>
          Excluir
        </button>
      </div>
    </div>
  );
}
