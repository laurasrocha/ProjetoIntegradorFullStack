// botao 
'use client'

export default function Botao({ children, className = '', ...props }) {
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
