// SearchAndSort.jsx
'use client'

export function SearchAndSort({ busca, setBusca, ordenacao, setOrdenacao }) {
  return (
    <div className='flex flex-col sm:flex-row justify-center items-center gap-4 mt-8 px-4'>
      <input
        type='text'
        placeholder='Buscar projeto...'
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        className='p-2 rounded w-full sm:w-1/3 border-2 border-[#004A8D]'
      />
      <select
        value={ordenacao}
        onChange={(e) => setOrdenacao(e.target.value)}
        className='border-2 border-[#004A8D] dark:bg-gray-900 p-2 rounded w-full sm:w-1/4 text-sm'
      >
        <option value="az">Ordem Alfabética (A-Z)</option>
        <option value="za">Ordem Alfabética (Z-A)</option>
      </select>
    </div>
  );
}